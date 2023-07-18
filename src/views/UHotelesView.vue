<template>
  <div>
    <h1>Actualizar Hoteles</h1>
    <v-data-table :headers="tableHeaders" :items="hotels" item-key="id" dense>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small @click="showUpdateForm(item)">Actualizar</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="modalVisible" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Actualizar Hotel</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateHotel">
            <v-text-field
              v-model="formData.host_id"
              label="ID"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.host_name"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.host_email"
              label="Email"
              required
            ></v-text-field>
            <!-- Agrega otros campos del formulario aquí -->
            <v-file-input
              v-model="formData.image"
              label="Imagen"
              accept="image/png"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :text="buttonText"
            @click="modalVisible = false"
            >Cerrar</v-btn
          >
          <v-btn color="primary" :text="buttonText" @click="updateHotel"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { DataTableHeader, DataTableItem } from "vuetify/lib";

interface Hotel {
  id: number;
  host_name: string;
  host_email: string;
  // Agrega otras propiedades aquí si es necesario
}

export default defineComponent({
  data() {
    return {
      hotels: [] as Hotel[],
      tableHeaders: [] as DataTableHeader[],
      modalVisible: false,
      formData: {
        host_id: null,
        host_name: "",
        host_email: "",
        // Agrega otros campos del formulario aquí
        image: undefined as File[] | undefined,
      },
      buttonText: "Click Me", // Asegúrate de que buttonText sea de tipo cadena (string)
    };
  },
  mounted() {
    this.fetchHotels();
  },
  methods: {
    fetchHotels() {
      axios
        .get("/admin/hosts/50", {
          headers: {
            Authorization: "Bearer {token}",
          },
        })
        .then((response) => {
          this.hotels = response.data.host;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    showUpdateForm(item: DataTableItem<Hotel>) {
      const hotel = item.item;
      this.formData.host_id = hotel.id;
      this.formData.host_name = hotel.host_name;
      this.formData.host_email = hotel.host_email;
      // Lógica para mostrar el formulario
      this.modalVisible = true;
    },
    updateHotel() {
      // Lógica para enviar la solicitud de actualización al API
      axios
        .post("/admin/host/updateInformation", this.formData, {
          headers: {
            Authorization: "Bearer {token}",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Lógica después de una respuesta exitosa
        })
        .catch((error) => {
          // Lógica para manejar errores
          console.error(error);
        });
    },
  },
});
</script>
