<script setup>
import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
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

// Cerrar modal y destruir editor
const closeModal = async (save = false) => {
  if (save) await saveToFirebase()
  isOpen.value = false
  editor = null // destruye la instancia para reinicializar en la próxima apertura
  emit('update:modelValue')
}

defineExpose({ openModal, currentBoxId, textContent, selectedColor })
</script>

<template>
  <v-dialog v-model="isOpen" max-width="600">
    <v-card>
      <v-card-title class="text-h6">Editar caja</v-card-title>
      <v-card-text>
        <div id="quill-editor" style="min-height:150px;"></div>
        <v-select
          v-model="selectedColor"
          :items="colors"
          label="Color"
          dense
          outlined
          class="mt-4"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" variant="text" @click="closeModal(false)">Cerrar</v-btn>
        <v-btn color="primary" @click="closeModal(true)">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
