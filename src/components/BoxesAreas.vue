<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { auth, db } from '@/firebase'
import { collection, doc, setDoc, getDocs, updateDoc } from 'firebase/firestore'
import Vue3DraggableResizable from 'vue3-draggable-resizable'

// Emit para abrir modal en el padre
const emit = defineEmits(['open-modal'])

const boxes = ref([])

const loadBoxes = async () => {
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  const snapshot = await getDocs(collection(db, "users", uid, "boxes"))
  
  boxes.value = snapshot.docs.map(doc => {
    const data = doc.data()
    const box = {
      id: doc.id,
      text: data.text || '',
      color: data.color || 'tomato',
      x: data.x ?? 0,
      y: data.y ?? 0,
      w: data.w ?? 150,
      h: data.h ?? 100
    }

    console.log(`Caja cargada: id=${box.id}, x=${box.x}, y=${box.y}, w=${box.w}, h=${box.h}`)
    
    return box
  })
}



onMounted(() => loadBoxes())

// Guardar automáticamente cuando cambia posición o tamaño
const updateBox = async (box) => {
  await nextTick() 
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  const boxRef = doc(db, "users", uid, "boxes", String(box.id))

  try {
    await updateDoc(boxRef, {
    x: box.x ?? 0,
    y: box.y ?? 0,
    w: box.w ?? 150,
    h: box.h ?? 100
    })
    console.log(`Caja ${box.id} actualizada`)
  } catch (err) {
    console.error("Error al actualizar caja", err)
  }
}


// Crear una nueva caja
const createBox = async (x, y) => {
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  const boxId = Date.now().toString()
  const newBox = {
    text: '',
    color: 'tomato',
    x: x ?? 0,
    y: y ?? 0,
    w: 150,
    h: 100
  }
  await setDoc(doc(db, "users", uid, "boxes", String(boxId)), newBox)
  boxes.value.push({ id: boxId, ...newBox })
}

// Abrir modal con botón "Editar"
const openTextModal = (box) => {
  console.log('Abriendo modal para caja:', box)
  emit('open-modal', box)
}

defineExpose({
  createBox,
  loadBoxes
})
// Función para limpiar HTML
const getTitle = (html, maxLength = 20) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  const text = tmp.textContent || tmp.innerText || ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}
</script>

<template>
  <div class="drag-area">
    <vue3-draggable-resizable
  v-for="box in boxes"
  :key="box.id"
  :parent="true"
  v-model:x="box.x"
  v-model:y="box.y"
  v-model:w="box.w"
  v-model:h="box.h"
  :initW="box.w" 
  :initH="box.h"  
  :minw="100"
  :minh="100"
  @drag-end="updateBox(box)"
  @resize-end="updateBox(box)"
    >
      <div
        :style="{
          backgroundColor: box.color,
          width: '100%',
          height: '100%',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          color:'white',
          padding:'4px'
        }"
      >
        <div style="flex:1; display:flex; justify-content:center; align-items:center; text-align:center;">
          {{ getTitle(box.text, 30) }}
        </div>
        <v-btn @click.stop="openTextModal(box)" color="info" small>
          Editar
        </v-btn>
      </div>
    </vue3-draggable-resizable>
  </div>
</template>

<style scoped>
.drag-area {
  position: relative;
  width: 100%;
  height: 100vh;
  border: 2px dashed #ccc;
}
</style>
