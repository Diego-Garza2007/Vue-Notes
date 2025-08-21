<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)
const currentBoxId = ref(null)
const textContent = ref('<p>Hola!</p>')
const selectedColor = ref('tomato')
let editor = null

const colors = [
  'tomato', 'dodgerblue', 'mediumseagreen', 'gold', 'violet',
  'orange', 'teal', 'slateblue', 'pink', 'brown'
]

const editorOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: colors }, { background: colors }],
      ['clean']
    ]
  },
  theme: 'snow'
}

// Inicializar Quill cada vez que se abre la modal
const initEditor = () => {
  const container = document.getElementById('quill-editor')
  if (container) {
    editor = new Quill(container, editorOptions)
    editor.root.innerHTML = textContent.value
    editor.on('text-change', () => {
      textContent.value = editor.root.innerHTML
    })
  }
}

// Abrir modal
const openModal = (id, text, color) => {
  currentBoxId.value = id
  textContent.value = text
  selectedColor.value = color
  isOpen.value = true
  // Dar tiempo a que el DOM de la modal se monte
  setTimeout(initEditor, 50)
}

// Guardar en Firebase
const saveToFirebase = async () => {
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  try {
    const boxRef = doc(db, "users", uid, "boxes", String(currentBoxId.value))
    await setDoc(boxRef, { text: textContent.value, color: selectedColor.value }, { merge: true })
    console.log("Caja guardada en Firebase ✅")
  } catch (error) {
    console.error("Error al guardar en Firebase ❌", error)
  }
}

// Eliminar de Firebase
const deleteFromFirebase = async () => {
  const user = auth.currentUser
  if (!user) return
  const uid = user.uid
  try {
    const boxRef = doc(db, "users", uid, "boxes", String(currentBoxId.value))
    await deleteDoc(boxRef)
    console.log("Caja eliminada de Firebase ✅")
  } catch (error) {
    console.error("Error al eliminar de Firebase ❌", error)
  }
}

// Cerrar modal y destruir editor
const closeModal = async (save = false) => {
  if (save) await saveToFirebase()
  isOpen.value = false
  editor = null // destruye la instancia para reinicializar en la próxima apertura
  emit('update:modelValue')
}

// Eliminar caja
const deleteBox = async () => {
  await deleteFromFirebase()
  isOpen.value = false
  editor = null
  emit('update:modelValue')
}

defineExpose({ openModal, currentBoxId, textContent, selectedColor })
</script>

<template>
  <v-dialog v-model="isOpen" max-width="900" max-height="800">
    <v-card class="modal-card">
      <v-card-title class="text-h6">Editar caja</v-card-title>
      <v-card-text class="modal-content">
        <div class="editor-container">
          <div id="quill-editor" class="editor"></div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between align-center px-6">
        <v-select
          v-model="selectedColor"
          :items="colors"
          label="Color"
          dense
          outlined
          class="color-select"
        />
        
        <div class="action-buttons">
          <v-btn color="red" @click="deleteBox">Eliminar</v-btn>
          <v-btn color="grey" variant="text" @click="closeModal(false)">Cerrar</v-btn>
          <v-btn color="primary" @click="closeModal(true)">Guardar</v-btn>
          
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.modal-card {
  height: 550px;
  display: flex;
  flex-direction: column;
}

.modal-content {
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
}

.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.editor {
  flex: 1;
  overflow: hidden;
}

.color-select {
  max-width: 200px;
  min-width: 100px;
}

.action-buttons {
  display: flex;
}

/* Personalizar el editor Quill */
:deep(.ql-container) {  
  font-size: 14px;
  min-height: 350px;
  border-radius: 0px 0px 5px 5px;
}

:deep(.ql-toolbar) {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #ccc;
}

:deep(.ql-editor) {
  min-height: 350px;
  padding: 16px;
}
</style>