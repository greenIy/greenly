<template>
	<div class="container mt-5">
		<div class="row align-items-start">
			<div class="col-4">
				<div class="card fixedMap">
					<div v-if="this.warehousesLength > 0" class="card-body">
						<div id="map"></div>
					</div>
					<div v-else class="card-body text-center fs-4" style="margin-top: 250px">
						<p>Parece que ainda não criou nenhum armazém.</p>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="col d-inline-flex">
					<div class="card me-4" style="width: 100%; cursor:pointer" data-bs-toggle="modal" data-bs-target="#newWarehouseModal">
						<div class="card-body addWarehouseButton align-items-center justify-content-center">
							<h1><font-awesome-icon :icon="['fa', 'plus']" size="2xl" style="color: grey" /></h1>
							<span>criar novo armazém</span>
						</div>
					</div>
					<div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp; Armazéns</h5>
							<h1 class="card-text">{{ this.calculateWarehousesLength() }}</h1>
							<hr>
							<small class="card-text">número total de armazéns</small>
						</div>
					</div>
					<div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'bolt']" />&nbsp; Recursos</h5>
							<h1 class="card-text">{{ this.calculateEstimatedTotalResources() }}</h1>
							<hr>
							<small class="card-text">estimativa do total de recursos usados</small>
						</div>
					</div>
                    <div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'boxes-stacked']" />&nbsp; Stock</h5>
							<h1 class="card-text">{{ this.calculateTotalStock() }}</h1>
							<hr>
							<small class="card-text">total de stock combinado</small>
						</div>
					</div>
				</div>
				<div v-if="this.warehousesLength > 0" class="row ms-1">
					<div v-for="(warehouse, index) in this.warehouses" :key="warehouse.id" class="card mt-4 me-4" style="max-width: 46%; height: 410px;">
						<div class="card-body p-4">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'warehouse']" />&nbsp; #{{ warehouse.id }}</h5>
							<div class="position-absolute top-0 end-0 p-4 pe-4">
								<p data-bs-toggle="modal" data-bs-target="#removeWarehouse" style="cursor: pointer; color: red;" v-on:click="this.selectedWarehouse = warehouse">Remover</p>
							</div>
							<hr>
							<div style="height: 35%;">
								<h6><font-awesome-icon :icon="['fa', 'location-dot']" size="sm"/>&nbsp; Morada</h6>
								<address>
									{{ warehouse.address.street }}<br>
									{{ warehouse.address.city }}, {{ warehouse.address.country }}<br>
									<abbr title="CP">Código Postal:</abbr> {{ warehouse.address.postal_code }}
								</address>
							</div>
							<h6><font-awesome-icon :icon="['fa', 'circle-info']" />&nbsp; Detalhes</h6>
								<div>
									<span>Capacidade: {{ warehouse.capacity }}m²</span><br>
									<span>Recursos usados: {{ warehouse.resource_usage }}</span><br>
									<span>Recursos renováveis: {{ warehouse.renewable_resources }}</span>
								</div>					
							<div class="text-center mt-4">
								<button type="button" class="btn btn-secondary btn-sm me-3" v-on:click="changeMapCenter(warehouse.address.latitude, warehouse.address.longitude)"><font-awesome-icon :icon="['fa', 'location-crosshairs']" />&nbsp; Destacar no mapa</button>
								<button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#detailsWarehouseModal" v-on:click="getWarehouseInfo(warehouse)"><font-awesome-icon :icon="['fa', 'up-right-and-down-left-from-center']" />&nbsp; Mais detalhes</button>
							</div>
						</div>
					</div>				
				</div>

				<!-- Modal New Warehouse -->
				<div class="modal fade" id="newWarehouseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="newWarehouseModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="newWarehouseModalLabel">Criar armazém</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<form @submit.prevent="newWarehouse()">
					<div class="modal-body">
							<div class="col mb-3">
								<label for="newWarehouseCapacity" class="form-label">Capacidade em m² <span style='color: #FF0000;'>*</span></label>
								<input type="number" class="form-control w-50" id="newWarehouseCapacity" v-model="this.newWarehouseInfo.capacity" placeholder="Capacidade" required>
							</div>
							<div class="col mb-3 d-flex">
								<div>
									<label for="newResourceUsage" class="form-label">Recursos usados  <span style='color: #FF0000;'>*</span></label>
									<input type="number" class="form-control" style="width: 95%" id="newResourceUsage" v-model="this.newWarehouseInfo.resourceUsage" placeholder="Recursos usados" required>
								</div>
								<div class="ms-4">
									<label for="newRenewableResources" class="form-label">Recursos renováveis <span style='color: #FF0000;'>*</span></label>
									<input type="number" class="form-control" style="width: 95%" id="newRenewableResources" v-model="this.newWarehouseInfo.renewableResources" placeholder="Recursos renováveis" required>
								</div>
							</div>
							<div class="col mb-3">
								<label for="newWarehouseAddress" class="form-label">Morada <span style='color: #FF0000;'>*</span></label><br>
								<div v-if="!this.newWarehouseInfo.address.street" class="mb-3">
									<small>Ainda não selecionou nenhuma morada.</small><br>
									<small>Por favor selecione uma morada a partir do conjunto de moradas associadas ao seu perfil.</small>
								</div>
								<div v-else>
									<div class="card mb-3 ms-2" style="width: 300px !important; cursor: pointer;">
										<div class="card-body">
											<address>
												<strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ this.newWarehouseInfo.address.city }}</strong><br>
												{{ this.newWarehouseInfo.address.street }}<br>
												{{ this.newWarehouseInfo.address.city }}, {{ this.newWarehouseInfo.address.country }}<br>
												Código Postal: {{ this.newWarehouseInfo.address.postal_code }}<br>
												NIF: {{ this.newWarehouseInfo.address.nif }}
											</address>
										</div>
									</div>  
								</div>
								<button type="button" class="btn btn-secondary ms-3" data-bs-toggle="modal" data-bs-target="#chooseAddressNewWarehouse" id="newWarehouseAddress" v-on:click=""><font-awesome-icon :icon="['fa', 'map-location-dot']" />&nbsp; Moradas disponiveis</button>
                        	</div>
					</div>
					<div class="modal-footer">
						<button type="button" id="closeNewWarehouseModal" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
						<button v-if="!this.newWarehouseInfo.address.street" type="submit" class="btn btn-primary" disabled>Criar</button>
						<button v-else type="submit" class="btn btn-primary">Criar</button>
					</div>
					</form>
					</div>
				</div>
				</div>

				<!-- Modal Choose Address New Warehouse -->
				<div class="modal fade" id="chooseAddressNewWarehouse" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="chooseAddressNewWarehouseLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="chooseAddressNewWarehouseLabel">Selecione a morada do armazém</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="row justify-content-center" style="max-height: 500px; overflow-y: auto;">
							<div v-if="getUnusedAddressesSize() > 0" v-for="address in getUnusedAddresses()" :key="address.nif" class="card mt-3 mb-3" style="width: 300px !important; cursor: pointer;" v-on:click="this.newWarehouseInfo.address = address" data-bs-toggle="modal" data-bs-target="#newWarehouseModal">
								<div class="card-body">
									<address>
										<strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
										{{ address.street }}<br>
										{{ address.city }}, {{ address.country }}<br>
										Código Postal: {{ address.postal_code }}<br>
										NIF: {{ address.nif }}
									</address>           
								</div>
							</div>
							<div v-else class="text-center mt-3 mb-3">
								<p data-bs-dismiss="modal">Parece que não se encontram moradas disponíveis.<br>Por favor adicione uma ao seu <router-link class="greenly-link" to="/perfil/moradas">perfil</router-link>!</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newWarehouseModal">Voltar</button>
					</div>
					</div>
				</div>
				</div>

				<!-- Modal Details Warehouse -->
				<div class="modal fade" id="detailsWarehouseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="detailsWarehouseModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="detailsWarehouseModalLabel">Armazém #{{ this.selectedWarehouse.id }}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="row align-items-start">
								<div class="col">
									<h5><font-awesome-icon :icon="['fa', 'location-dot']" size="sm"/>&nbsp; Morada</h5>
									<address class="ms-2 mt-2">
										{{ this.selectedWarehouse.address.street }}<br>
										{{ this.selectedWarehouse.address.city }}, {{ this.selectedWarehouse.address.country }}<br>
										<abbr title="CP">Código Postal:</abbr> {{ this.selectedWarehouse.address.postal_code }}
									</address>
									<div class="text-center">
										<button type="button" class="btn btn-secondary btn-sm mt-5" data-bs-toggle="modal" data-bs-target="#chooseAddressModal"><font-awesome-icon :icon="['fa', 'pencil']" size="sm"/>&nbsp; Alterar morada</button>
									</div>
								</div>
								<div class="col">
									<div id="warehouseMap"></div>
								</div>
							</div>
						</div>
						<hr>
						<div class="container">
							<h5><font-awesome-icon :icon="['fa', 'truck']" size="sm"/>&nbsp; Capacidade</h5>
							<div class="row align-items-start justify-content-center" style="max-height: 255px; min-height: 230px;">	
								<table class="table mt-3 ms-2 w-75">
									<tbody>
										<tr>
											<td>Capacidade</td>
											<td class="text-end">{{ this.selectedWarehouse.capacity }}m²</td>
										</tr>
										<tr>
											<td>Produtos únicos</td>
											<td class="text-end">{{ this.selectedWarehouse.unique_products }}</td>
										</tr>
										<tr>
											<td>Total de stock</td>
											<td class="text-end">{{ this.selectedWarehouse.combined_stock }}</td>
										</tr>
										<tr>
											<td>Recursos usados</td>
											<td class="text-end">{{ this.selectedWarehouse.resource_usage }}</td>
										</tr>
										<tr>
											<td>Recursos renováveis</td>
											<td class="text-end">{{ this.selectedWarehouse.renewable_resources }}</td>
										</tr>
										<tr>
											<td>Valor total</td>
											<td class="text-end">{{ this.selectedWarehouse.total_value }}</td>
										</tr>
									</tbody>
								</table>  
							</div>
							<div class="text-center">
								<button type="button" class="btn btn-secondary btn-sm mt-4" data-bs-toggle="modal" data-bs-target="#editDetailsModal"><font-awesome-icon :icon="['fa', 'pencil']" size="sm"/>&nbsp; Editar detalhes</button>
							</div>
						</div>		
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Voltar</button>
					</div>
					</div>
				</div>
				</div>

				<!-- Modal Choose Address -->
				<div class="modal fade" id="chooseAddressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="chooseAddressModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="chooseAddressModalLabel">Selecione morada do armazém #{{ this.selectedWarehouse.id }}</h5>
						<button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#detailsWarehouseModal"></button>
					</div>
					<div class="modal-body">
						<div class="row justify-content-center" style="max-height: 500px; overflow-y: auto;">
							<div v-if="getUnusedAddressesSize() > 0" v-for="address in getUnusedAddresses()" :key="address.nif" class="card mt-3 mb-3" style="width: 300px !important; cursor: pointer;">
								<div class="card-body" v-on:click="editWarehouseAddress(this.selectedWarehouse, address)" data-bs-toggle="modal" data-bs-target="#detailsWarehouseModal">
									<address>
										<strong><font-awesome-icon :icon="['fa', 'house-chimney']" />&nbsp; {{ address.city }}</strong><br>
										{{ address.street }}<br>
										{{ address.city }}, {{ address.country }}<br>
										Código Postal: {{ address.postal_code }}<br>
										NIF: {{ address.nif }}
									</address>           
								</div>
							</div>
							<div v-else class="text-center mt-3 mb-3">
								<p data-bs-dismiss="modal">Parece que não se encontram moradas disponíveis.<br>Por favor adicione uma ao seu <router-link class="greenly-link" to="/perfil/moradas">perfil</router-link>!</p>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detailsWarehouseModal">Cancelar</button>
					</div>
					</div>
				</div>
				</div>

				<!-- Modal Edit Details -->
				<div class="modal fade" id="editDetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editDetailsModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editDetailsModalLabel">Armazém #{{ this.selectedWarehouse.id }}</h5>
						<button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#detailsWarehouseModal"></button>
					</div>
					<form @submit.prevent="editWarehouseDetails(this.selectedWarehouse)">
					<div class="modal-body">
						<div class="col mb-3">
							<label for="editWarehouseCapacity" class="form-label">Capacidade em m² <span style='color: #FF0000;'>*</span></label>
							<input type="number" class="form-control w-50" id="editWarehouseCapacity" v-bind:value="this.selectedWarehouse.capacity" placeholder="Capacidade" required>
						</div>
						<div class="col mb-3 d-flex">
							<div>
								<label for="editWarehouseResourceUsage" class="form-label">Recursos usados  <span style='color: #FF0000;'>*</span></label>
								<input type="number" class="form-control" style="width: 95%" id="editWarehouseResourceUsage" v-bind:value="this.selectedWarehouse.resource_usage" placeholder="Recursos usados" required>
							</div>
							<div class="ms-4">
								<label for="editWarehouseRenewableResources" class="form-label">Recursos renováveis <span style='color: #FF0000;'>*</span></label>
								<input type="number" class="form-control" style="width: 95%" id="editWarehouseRenewableResources" v-bind:value="this.selectedWarehouse.renewable_resources" placeholder="Recursos renováveis" required>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" id="closeEditDetails" data-bs-toggle="modal" data-bs-target="#detailsWarehouseModal">Cancelar</button>
						<button type="submit" class="btn btn-primary">Alterar</button>
					</div>
					</form>
					</div>
				</div>
				</div>

				<!-- Modal Remove Warehouse -->
				<div class="modal fade" id="removeWarehouse" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removeWarehouseLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="removeWarehouseLabel">Remover armazém #{{ this.selectedWarehouse.id }}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p>Tem a certeza que pretende remover este armazém?</p>
					</div>
					<div class="modal-footer">
						<button type="button" id="closeRemoveWarehouse" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-danger" v-on:click="removeWarehouse(this.selectedWarehouse.id)">Remover</button>
					</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
		
</template>

<script>
import { useToast } from "vue-toastification";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWarehouse, faLocationDot, faCircleInfo, faBoxesStacked, faBolt, faLocationCrosshairs, faUpRightAndDownLeftFromCenter, faPencil, faPlus, faMinus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
library.add(faWarehouse, faLocationDot, faCircleInfo, faBoxesStacked, faBolt, faLocationCrosshairs, faUpRightAndDownLeftFromCenter, faPencil, faPlus, faMinus, faCircleMinus);

import http from "../../../http-common";
import { Loader } from "@googlemaps/js-api-loader"

export default {
	name: "Warehouses",
	mounted() {
		this.getUserInfo()
		this.getUserWarehouses();
	},
	data() {
		const toast = useToast()
        return {
            toast,
			user: {addresses:[]},
			warehouses: [],
			warehousesLength: 1,
			selectedWarehouse: {capacity:'', address:{}},
			map: {},
			newWarehouseInfo: {capacity:'', resourceUsage:'', renewableResources:'', address:{}},
			editWarehouseInfo: {capacity:'', resourceUsage:'', renewableResources:'', address:{}},
		};
	},
	methods: {
		initMaps() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
				if (this.distributionCenters.length > 0) {
					let mapCenter = {
						lat: this.warehouses[0].address.latitude,
						lng: this.warehouses[0].address.longitude
					}
					this.map = new google.maps.Map(document.getElementById("map"), {
						center: mapCenter,
						zoom: 10,
						streetViewControl: false,
						mapTypeControl: false,
						fullscreenControl: false,
						zoomControl: false,
						disableDoubleClickZoom: true,
						draggable: false,
						disableDefaultUI: true,
						clickableIcons: false,
					})
					for (let warehouse of this.warehouses) {
						let markerPosition = {
							lat: warehouse.address.latitude,
							lng: warehouse.address.longitude
						}
						const marker = new google.maps.Marker({
							position: markerPosition,
							map: this.map,
							label: {
								text: `#${warehouse.id}`,
								color: "#FFF"
							}
						});
					}
				}
            })
        },
		initWarehouseMap() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
                let position = {lat: this.selectedWarehouse.address.latitude, lng: this.selectedWarehouse.address.longitude}
                let warehouseMap = new google.maps.Map(document.getElementById("warehouseMap"), {
                center: position,
                zoom: 12,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: false,
                disableDoubleClickZoom: true,
                draggable: false,
                disableDefaultUI: true,
                clickableIcons: false,
                })
				const marker = new google.maps.Marker({
                        position: position,
                        map: warehouseMap,
                        label: {
                            text: " ",
                            color: "#FFF"
                        }
                    }
                );
            })
        },
		changeMapCenter(lat, long) {
			var latLng = new google.maps.LatLng(lat, long)
			this.map.panTo(latLng);
		},
		getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        getUserWarehouses() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/supplier/${userId}/warehouses`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.warehouses = response.data;
						this.initMaps();
						this.calculateWarehousesLength();
						this.getUnusedAddresses();
						this.getUnusedAddressesSize();
						console.log(this.warehouses)
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
        },
		getWarehouseInfo(warehouse) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/supplier/${userId}/warehouses/${warehouse.id}`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.selectedWarehouse = response.data;
						this.initWarehouseMap()
						//this.getCenterCapacity(this.selectedWarehouse);
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
		},
		calculateWarehousesLength() {
			this.warehousesLength = Object.keys(this.warehouses).length;
			return this.warehousesLength
		},
		calculateTotalStock() {
			let totalStock = 0
			for (let warehouse of this.warehouses) {
				totalStock += warehouse.combined_stock
			}
			return totalStock;
		},
		calculateEstimatedTotalResources() {
			let totalEstimatedResources = 0
			for (let warehouse of this.warehouses) {
				totalEstimatedResources += warehouse.estimated_total_resource_usage
			}
			return totalEstimatedResources;
		},
		getWarehouseCapacity(warehouse) {
			let vehicleEstimate = Math.floor(warehouse.capacity/36) > 0 ? Math.floor(warehouse.capacity/36) : 1
			let percentage = (warehouse.total_vehicles / vehicleEstimate) * 100
			if (percentage < 100) {
				document.getElementById('selectedCapacityBar').style.width = `${percentage}%`;
				document.getElementById('selectedCapacityBar').classList.remove("bg-danger")
				document.getElementById('selectedCapacityBar').classList.add("bg-success")
			} else {
				console.log(percentage)
				document.getElementById('selectedCapacityBar').style.width = `${percentage}%`;
				document.getElementById('selectedCapacityBar').classList.remove("bg-success")
				document.getElementById('selectedCapacityBar').classList.add("bg-danger")
			}
			
		},
		getWarehouseCapacity(index) {
			let warehouse = this.warehouses[index]
			let vehicleEstimate = Math.floor(warehouse.capacity/36) > 0 ? Math.floor(warehouse.capacity/36) : 1
			return (warehouse.total_vehicles / vehicleEstimate) * 100
		},
		getUnusedAddresses() {
			return this.user.addresses.filter((address) => {
				let usedWarehouseAddresses = this.warehouses.map((warehouse) => warehouse.address.id)
				return !usedWarehouseAddresses.includes(address.id)
			})
		},
		getUnusedAddressesSize() {
			return Object.keys(this.getUnusedAddresses()).length;
		},
		successfulToast(message) {
            this.toast.success(message, {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        },
		successfulNewWarehouse() {
            this.getUserWarehouses();
            var closeEditModal = document.getElementById("closeNewWarehouseModal");
            closeEditModal.click();
			this.successfulToast("Adicionado! O novo armazém foi adicionado com sucesso.")
        },
		successfulNewDetails() {
			var closeEditModal = document.getElementById("closeEditDetails");
            closeEditModal.click();
			this.getUserWarehouses();
			this.getWarehouseInfo(this.selectedWarehouse);
			this.successfulToast("Atualizados! Os detalhes do armazém foram alterados com sucesso.")
		},
		successfulRemoveWarehouse() {
            this.getUserWarehouses();
            var closeEditModal = document.getElementById("closeRemoveWarehouse");
            closeEditModal.click();
            this.successfulToast("Removido! O armazém foi removido com sucesso.")
        },
		newWarehouse() {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            http.post(`/supplier/${userId}/warehouses`, JSON.stringify({
                address: this.newWarehouseInfo.address.id,
                capacity: this.newWarehouseInfo.capacity,
                resource_usage: this.newWarehouseInfo.resourceUsage,
                renewable_resources: this.newWarehouseInfo.renewableResources
            }), headers)
            .then((response) => {
                if (response.status == 200) {
                    this.successfulNewWarehouse()
                }
                }).catch((error) => {
                    console.log(error);
                })
		},
		editWarehouseAddress(warehouse, address) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.put(`/supplier/${userId}/warehouses/${warehouse.id}`, JSON.stringify({
					address: address.id,
				}), headers)
                .then((response) => {
                    if (response.status == 201) {
						this.getUserWarehouses()
                        this.successfulToast("Alterada! A morada do armazém foi alterada com sucesso.")
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
		},
		editWarehouseDetails(warehouse) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
				console.log(document.getElementById("editWarehouseCapacity").value)
				console.log(document.getElementById("editWarehouseResourceUsage").value)
				console.log(document.getElementById("editWarehouseRenewableResources").value)
                http.put(`/supplier/${userId}/warehouses/${warehouse.id}`, JSON.stringify({
					capacity: Number(document.getElementById("editWarehouseCapacity").value),
					resource_usage: Number(document.getElementById("editWarehouseResourceUsage").value),
                	renewable_resources: Number(document.getElementById("editWarehouseRenewableResources").value)
				}), headers)
                .then((response) => {
                    if (response.status == 201) {
						this.getWarehouseInfo(warehouse);
                        this.successfulNewDetails();
                    }
                    }).catch((error) => {
                        console.log(error);
                        console.log("Failure!")
                    })
            }
		},
		removeWarehouse(warehouse) {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/supplier/${userId}/warehouses/${warehouse}`, headers)
                    .then((response) => {
						console.log(response)
                        if (response.status == 200) {
                            this.successfulRemoveWarehouse() 
                        }
                    }).catch(error => {
                            console.log(error.response)
                    }) 
            }
		}
	}
			
};
</script>

<style scoped>
	#map {
        height: 620px;
        width: 100%;
    }
	#warehouseMap {
        height: 220px;
        width: 100%;
		border-radius: 5px;
    }
	.fixedMap {
		z-index: 1;
		position: fixed;
		height: 650px;
        max-width: 400px;
		min-width: 390px;
	}
	.card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .card:hover {
        box-shadow: 1px 10px 12px #d9d9d9;
    }
	.btn-primary{
        background-color: #5E9F88;
        border-color: white;
    }
	#warehouseTruck {
		width: 100px;
	}
	.licensePlate {
		width: 100px !important;
		background-color: white;
		text-align: center;
		font-weight: bold;
		font-size: 19px;
		border-radius: 5px;
		border: 1px solid #000;
		box-shadow: 1px 1px 1px #ddd;
		font-family: helvetica, ariel, sans-serif;
	}
	.addWarehouseButton {
		text-align: center;
		margin-top: 10%;
	}
	.greenly-link {
        color: #5e9f88;
    }
	#selectedCapacityBar {
		font-size: 15px;
		font-weight: bold;
	}
	::-webkit-scrollbar {
        width: 17px;
    }
    ::-webkit-scrollbar-track {
        background-color: #E4E4E4;
        border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 5px solid transparent;
        background-clip: content-box;
        background-color: #5E9F88;
    }
    :focus {
        outline: 0 !important;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important;
    }
</style>