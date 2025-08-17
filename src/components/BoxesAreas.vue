<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '@/firebase'
import { collection, doc, setDoc, getDocs } from 'firebase/firestore'
import Vue3DraggableResizable from 'vue3-draggable-resizable'

const emit = defineEmits(['open-modal'])

const boxes = ref([])

// Cargar cajas del usuario
const loadBoxes = async () => {
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  const snapshot = await getDocs(collection(db, "users", uid, "boxes"))
  boxes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

onMounted(() => loadBoxes())

// Crear caja
const createBox = async (x, y) => {
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  const boxId = Date.now()
  const newBox = { text: '', color: 'tomato', x, y, w: 150, h: 100 }
  await setDoc(doc(db, "users", uid, "boxes", String(boxId)), newBox)
  boxes.value.push({ id: boxId, ...newBox })
}

// Abrir modal con botón
const openTextModal = (box) => emit('open-modal', box)

defineExpose({
  createBox,
  loadBoxes
})
</script>

<template>
  <div class="drag-area">
    <vue3-draggable-resizable
      v-for="box in boxes"
      :key="box.id"
      :x="box.x"
      :y="box.y"
      :w="box.w"
      :h="box.h"
      :parent="true"
    >
      <div :style="{ backgroundColor: box.color, width: '100%', height: '100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', color:'white', padding:'4px' }">
        <div style="flex:1; display:flex; justify-content:center; align-items:center; text-align:center;">
          {{ box.text }}
        </div>
        <v-btn @click.stop="openTextModal(box)" color="info">
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
}
</style>
