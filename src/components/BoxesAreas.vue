<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { auth, db } from '@/firebase'
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import Vue3DraggableResizable from 'vue3-draggable-resizable'

// Emit para abrir modal en el padre y para el clic derecho en caja
const emit = defineEmits(['open-modal', 'box-right-click'])
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

// Borrar una caja
const deleteBox = async (boxId) => {
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  
  try {
    // Eliminar de Firebase
    await deleteDoc(doc(db, "users", uid, "boxes", String(boxId)))
    
    // Eliminar del array local
    boxes.value = boxes.value.filter(box => box.id !== boxId)
    console.log(`Caja ${boxId} eliminada`)
  } catch (err) {
    console.error("Error al eliminar caja", err)
  }
}

// Abrir modal con doble clic
const openTextModal = (box) => {
  console.log('Abriendo modal para caja:', box)
  emit('open-modal', box)
}

// Manejar clic derecho en caja
const onBoxRightClick = (e, box) => {
  emit('box-right-click', e, box)
}

defineExpose({
  createBox,
  loadBoxes,
  deleteBox
})

const getTitleFirstParagraph = (quillHtml, maxLength = 30) => {
  if (!quillHtml) return ''
  
  const tmp = document.createElement('div')
  tmp.innerHTML = quillHtml
  
  // Find first non-empty paragraph
  const paragraphs = tmp.querySelectorAll('p')
  let firstParagraph = null
  
  for (let p of paragraphs) {
    if (p.textContent.trim() !== '' && p.innerHTML.trim() !== '<br>') {
      firstParagraph = p
      break
    }
  }
  
  if (!firstParagraph) return ''
  
  const textLength = firstParagraph.textContent.trim().length
  
  if (textLength <= maxLength) {
    return firstParagraph.outerHTML
  }
  
  // Truncate within the paragraph
  let currentLength = 0
  let result = ''
  let truncated = false
  
  const processNode = (node) => {
    if (truncated) return
    
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent
      if (currentLength + text.length <= maxLength) {
        result += text
        currentLength += text.length
      } else {
        const remaining = maxLength - currentLength
        const truncatedText = text.slice(0, remaining)
        const lastSpace = truncatedText.lastIndexOf(' ')
        
        if (lastSpace > remaining * 0.6) {
          result += truncatedText.slice(0, lastSpace) + '...'
        } else {
          result += truncatedText + '...'
        }
        truncated = true
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase()
      
      // Preserve formatting tags
      const attributes = []
      if (node.hasAttribute('style')) {
        attributes.push(`style="${node.getAttribute('style')}"`)
      }
      
      const attrString = attributes.length > 0 ? ' ' + attributes.join(' ') : ''
      result += `<${tagName}${attrString}>`
      
      for (let child of node.childNodes) {
        processNode(child)
        if (truncated) break
      }
      
      result += `</${tagName}>`
    }
  }
  
  // Build opening paragraph tag
  const pAttributes = []
  if (firstParagraph.hasAttribute('style')) {
    pAttributes.push(`style="${firstParagraph.getAttribute('style')}"`)
  }
  const pAttrString = pAttributes.length > 0 ? ' ' + pAttributes.join(' ') : ''
  
  let finalResult = `<p${pAttrString}>`
  
  // Process paragraph content
  for (let child of firstParagraph.childNodes) {
    processNode(child)
    if (truncated) break
  }
  
  finalResult += result + '</p>'
  
  return finalResult.replace('<p></p>', '') // Remove if empty
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
          padding:'4px',
          borderRadius: '5px',
          cursor: 'pointer'
        }"
        @dblclick.stop="openTextModal(box)"
        @contextmenu.stop="onBoxRightClick($event, box)"
      >
    <div class="box-title" v-html="getTitleFirstParagraph(box.text, 30)"></div>
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

.box-title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
}
</style>