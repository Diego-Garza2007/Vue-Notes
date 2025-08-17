<script setup>
import { ref } from 'vue'
import { auth,  db } from '@/firebase'
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const currentBoxId = ref(null)
const textContent = ref('')
const selectedColor = ref('tomato')

const colors = [
  'tomato', 'dodgerblue', 'mediumseagreen', 'gold', 'violet',
  'orange', 'teal', 'slateblue', 'pink', 'brown'
]

// Abre la modal con datos actuales
const openModal = (id, text, color) => {
  currentBoxId.value = id
  textContent.value = text
  selectedColor.value = color
  isOpen.value = true
}

// Guardar en Firestore
  const user = auth.currentUser
const saveToFirebase = async () => {
  const user = auth.currentUser
  if (!user) {
    console.error("No hay usuario logueado ❌")
    return
  }
  const uid = user.uid  // 🔹 aquí declaramos uid correctamente
  try {
    const boxRef = doc(db, "users", uid, "boxes", String(currentBoxId.value))
    await setDoc(
      boxRef,
      {
        text: textContent.value,
        color: selectedColor.value
      },
      { merge: true }
    )
    console.log("Caja guardada en Firebase ✅")
  } catch (error) {
    console.error("Error al guardar en Firebase ❌", error)
  }
}

const loadBoxes = async () => {
  if (!auth.currentUser) return
  const uid = auth.currentUser.uid
  const boxesCol = collection(db, "users", uid, "boxes")
  const snapshot = await getDocs(boxesCol)
  const boxesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  boxes.value = boxesArray
}

// Cierra modal y dispara evento
const closeModal = async (save = false) => {
  if (save) await saveToFirebase()
  isOpen.value = false
  emit('update:modelValue')
}

defineExpose({ openModal, currentBoxId, textContent, selectedColor })
</script>


<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title class="text-h6">Editar caja</v-card-title>

      <v-card-text>
        <v-textarea
          v-model="textContent"
          label="Texto"
          rows="3"
          auto-grow
        />

        <div class="my-4">
          <div class="mb-2">Color:</div>
          <v-row dense>
            <v-col
              v-for="color in colors"
              :key="color"
              cols="2"
              class="d-flex justify-center"
            >
              <v-btn
                :style="{ backgroundColor: color }"
                icon
                size="small"
                variant="flat"
                :class="{ 'border-md border-black': selectedColor === color }"
                @click="selectedColor = color"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey" variant="text" @click="closeModal(false)">Cerrar</v-btn>
        <v-btn color="primary" @click="closeModal(true)">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
