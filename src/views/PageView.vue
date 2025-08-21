<script setup>
import { ref } from 'vue'
import BoxesArea from '@/components/BoxesAreas.vue'
import TextModal from '@/components/TextModal.vue'

const contextMenu = ref({ visible: false, x: 0, y: 0, targetBox: null })
const boxesAreaRef = ref(null)
const textModalRef = ref(null)

const onRightClick = (e) => {
  e.preventDefault()
  contextMenu.value.visible = true
  contextMenu.value.x = e.clientX
  contextMenu.value.y = e.clientY
  contextMenu.value.targetBox = null // Reset target box for general right-click
}

const onBoxRightClick = (e, box) => {
  e.preventDefault()
  e.stopPropagation()
  contextMenu.value.visible = true
  contextMenu.value.x = e.clientX
  contextMenu.value.y = e.clientY
  contextMenu.value.targetBox = box // Set the target box for deletion
}

const hideContextMenu = () => {
  contextMenu.value.visible = false
  contextMenu.value.targetBox = null
}

const createNewBox = () => {
  // Llamamos al método del componente BoxesArea para crear la caja
  boxesAreaRef.value.createBox(contextMenu.value.x, contextMenu.value.y)
  hideContextMenu()
}

const deleteBox = () => {
  if (contextMenu.value.targetBox) {
    boxesAreaRef.value.deleteBox(contextMenu.value.targetBox.id)
    hideContextMenu()
  }
}

const openTextModal = (box) => {
  textModalRef.value.openModal(box.id, box.text, box.color)
}

const loadBoxes = () => {
  boxesAreaRef.value.loadBoxes()
}
</script>

<template>
  <div class="page-container" @contextmenu="onRightClick" @click="hideContextMenu">
    <BoxesArea 
      ref="boxesAreaRef" 
      @open-modal="openTextModal" 
      @box-right-click="onBoxRightClick"
    />
    
    <div
      v-if="contextMenu.visible"
      :style="{ 
        position: 'fixed', 
        top: contextMenu.y + 'px', 
        left: contextMenu.x + 'px', 
        background: '#fff', 
        border: '1px solid #ccc', 
        padding: '6px', 
        borderRadius: '4px', 
        zIndex: 1000,
        minWidth: '150px'
      }"
    >
      <!-- Opción para crear nueva caja (siempre disponible) -->
      <div @click="createNewBox" style="color: black; cursor: pointer; padding: 4px;">
        Crear nueva caja
      </div>
      
      <!-- Opción para borrar caja (solo si hay una caja seleccionada) -->
      <div 
        v-if="contextMenu.targetBox" 
        @click="deleteBox" 
        style="color: red; cursor: pointer; padding: 4px; border-top: 1px solid #eee;"
      >
        Borrar caja
      </div>
    </div>
    
    <TextModal ref="textModalRef" @update:modelValue="loadBoxes" />
  </div>
</template>