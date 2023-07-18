<template>
  <div>
    <h1>Lista de Hoteles</h1>
    <v-data-table :headers="tableHeaders" :items="hotels" item-key="id" dense>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn small @click="showHotelDetail(item)">Ver detalle</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="modalVisible" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Detalle del Hotel</span>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ selectedHotel.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  selectedHotel.address
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :text="buttonText" @click="modalVisible = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { DataTableHeader } from "vuetify/types";

interface Hotel {
  name: string;
  address: string;
  // Agrega otras propiedades aquí si es necesario
}

export default {
  data() {
    return {
      hotels: [],
      selectedHotel: {} as Hotel,
      modalVisible: false,
      buttonText: "Click Me",
    };
  },
  computed: {
    tableHeaders(): DataTableHeader[] {
      return [
        { text: "ID", value: "id" },
        { text: "Nombre", value: "name" },
        { text: "Acciones", value: "actions", sortable: false },
      ];
    },
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
    showHotelDetail(hotel: any) {
      axios
        .get(`/admin/hosts/50/${hotel.id}`, {
          headers: {
            Authorization: "Bearer {token}",
          },
        })
        .then((response) => {
          this.selectedHotel = response.data as Hotel;
          this.modalVisible = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
