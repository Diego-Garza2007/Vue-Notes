<script setup>
import { ref } from 'vue'
import BoxesArea from '@/components/BoxesAreas.vue'
import TextModal from '@/components/TextModal.vue'

const contextMenu = ref({ visible: false, x: 0, y: 0 })
const boxesAreaRef = ref(null)
const textModalRef = ref(null)

const onRightClick = (e) => {
  e.preventDefault()
  contextMenu.value.visible = true
  contextMenu.value.x = e.clientX
  contextMenu.value.y = e.clientY
}

const hideContextMenu = () => contextMenu.value.visible = false

const createNewBox = () => {
  // Llamamos al método del componente BoxesArea para crear la caja
  boxesAreaRef.value.createBox(contextMenu.value.x, contextMenu.value.y)
  hideContextMenu()
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
    <BoxesArea ref="boxesAreaRef" @open-modal="openTextModal" />

    <div
      v-if="contextMenu.visible"
      :style="{ position: 'fixed', top: contextMenu.y + 'px', left: contextMenu.x + 'px', background: '#fff', border: '1px solid #ccc', padding: '6px', borderRadius: '4px', zIndex: 1000 }"
    >
      <div @click="createNewBox" class="context__text">Crear nueva caja</div>
    </div>

    <TextModal ref="textModalRef" @update:modelValue="loadBoxes" />
  </div>
</template>

