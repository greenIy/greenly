<template>
	<div class="container mt-5">
		<div class="row align-items-start">
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<div id="map"></div>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="col d-inline-flex">
					<div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							*sitio para botões*
							<br>
        					<button type="button" class="btn btn-danger" v-on:click="removeDistributionCenter()">APAGAR CENTRO #2</button>
						</div>
					</div>
					<div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; Centros de distribuição</h5>
							<h1 class="card-text">{{ this.calculateDistributionCentersLength() }}</h1>
							<hr>
							<small class="card-text">número total de centros de distribuição</small>
						</div>
					</div>
					<div class="card me-4" style="width: 100%;">
						<div class="card-body text-center">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'truck']" />&nbsp; Veículos de distribuição</h5>
							<h1 class="card-text">{{ this.calculateTotalVehicles() }}</h1>
							<hr>
							<small class="card-text">número total de veículos do centro de distribuição</small>
						</div>
					</div>
				</div>
				<div class="card-group">
					<div v-for="(center, index) in this.distributionCenters" :key="center.id" class="card mt-4 me-4" style="width: 450px;">
						<div class="card-body p-4">
							<h5 class="card-title"><font-awesome-icon :icon="['fa', 'building-circle-arrow-right']" />&nbsp; #{{ center.id }}</h5>
							<hr>
							<h6><font-awesome-icon :icon="['fa', 'location-dot']" />&nbsp; Localização</h6>
							<address>
								{{ center.address.street }}<br>
								{{ center.address.city }}, {{ center.address.country }}<br>
								<abbr title="CP">Código Postal:</abbr> {{ center.address.postal_code }}
							</address>
							<h6><font-awesome-icon :icon="['fa', 'truck']" />&nbsp; Capacidade</h6>
							<span>Veículos: {{ center.total_vehicles }}/{{ Math.ceil(center.capacity/36) }}</span>
							<div class="progress mt-2">
								<div :id="'capacityBar' + center.id" class="progress-bar bg-success" role="progressbar" style="width: 0%;" aria-valuemin="0" aria-valuemax="100"></div>
							</div>
							<div class="text-center mt-4">
								<button type="button" class="btn btn-secondary btn-sm me-3" v-on:click="changeMapCenter(center.address.latitude, center.address.longitude)"><font-awesome-icon :icon="['fa', 'location-crosshairs']" />&nbsp; Destacar no mapa</button>
								<button type="button" class="btn btn-secondary btn-sm" v-on:click="getDistributionCenterCapacity()"><font-awesome-icon :icon="['fa', 'pencil']" />&nbsp; Editar detalhes</button>
							</div>
						</div>
					</div>				
				</div>
			</div>
		</div>
	</div>
		
</template>

<script>

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBuildingCircleArrowRight, faLocationDot, faTruck, faTree, faSmog, faLocationCrosshairs, faPencil } from "@fortawesome/free-solid-svg-icons";
library.add(faBuildingCircleArrowRight, faLocationDot, faTruck, faTree, faSmog, faLocationCrosshairs, faPencil);

import http from "../../../http-common";
import { Loader } from "@googlemaps/js-api-loader"

export default {
	name: "DistributionCenters",
	mounted() {
		this.getUserDistributionCenters();
	},
	data() {
		return {
			user: {},
			distributionCenters: [],
			distributionCentersLength: 1,
			map: {},
		};
	},
	methods: {
		initMaps() {
            const loader = new Loader({
                apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
                version: "weekly"
            });
            loader.load().then(() => {
                let mapCenter = {lat: this.distributionCenters[0].address.latitude, lng: this.distributionCenters[0].address.longitude}
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
				for (let distributionCenter of this.distributionCenters) {
					let markerPosition = {lat: distributionCenter.address.latitude, lng: distributionCenter.address.longitude}
					const marker = new google.maps.Marker({
                        position: markerPosition,
                        map: this.map,
                        label: {
                            text: `#${distributionCenter.id}`,
                            color: "#FFF"
                        }
                    }
                );
				}
            })
        },
		getUserInfo() {
            this.user = this.$store.getters.getUser
            return this.user
        },
        getUserDistributionCenters() {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId){
                http.get(`/transporter/${userId}/centers`, headers)
                .then((response) => {
                    if (response.status == 200) {
                        this.distributionCenters = response.data;
						this.initMaps()
						this.calculateDistributionCentersLength()
						console.log(this.distributionCenters)
                    }
                    }).catch((error) => {
                        console.log(error.response.data);
                        console.log("Failure!")
                    })
            }
        },
		calculateDistributionCentersLength() {
			this.distributionCentersLength = Object.keys(this.distributionCenters).length;
			return this.distributionCentersLength
		},
		calculateTotalVehicles() {
			let totalVehicles = 0
			for (let distributionCenter of this.distributionCenters) {
				totalVehicles += distributionCenter.total_vehicles
			}
			return totalVehicles
		},
		getDistributionCenterCapacity() {
			for (let distributionCenter of this.distributionCenters) {
				document.getElementById('capacityBar' + distributionCenter.id).style.width = `${(1 / Math.ceil(distributionCenter.capacity/36) * 100)}%`;
			}
		},
		newDistributionCenter() {

		},
		changeMapCenter(lat, long) {
			var latLng = new google.maps.LatLng(lat, long)
			this.map.panTo(latLng);
		},
		removeDistributionCenter() {
			let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            let userId = JSON.parse(localStorage.getItem('userId'));
            const headers = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            if (accessToken && userId) {
                http.delete(`/transporter/${userId}/centers/${2}`, headers)
                    .then((response) => {
                        if (response.status == 202) {
                            /* AuthService.getUser().then((result) => {
                                this.user.addresses = result.addresses;
                            });
                            this.successfulRemoveAddress()*/
                            console.log("Success!") 
                        }
                    }).catch(error => {
                        /* if (error.response.data.message == 'Address not found.') {
                            this.addressHasOrders()
                        } else { */
                            console.log(error.response)
                        //} 
                    }) 
            }
		}
	}
			
};
</script>

<style scoped>
	#map {
        height: 550px;
        width: 100%;
        display: inline-block;
    }
	.card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .card:hover {
        box-shadow: 1px 10px 12px #d9d9d9;
    }
</style>
