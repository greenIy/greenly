<h2 class="page-title text-start align-middle mt-3"> Carrinho de compras</h2>
                        <div class="text-start mb-2">
                            <font-awesome-icon :icon="['fa', 'sun']" style="color: orange" /> Recursos renováveis
                            fornecedor |
                            <font-awesome-icon :icon="['fa', 'warehouse']" style="color: grey" /> Média recursos
                            fornecedor |
                            <font-awesome-icon :icon="['fa', 'gas-pump']" style="color: " /> Média recursos
                            transportador |
                            <font-awesome-icon :icon="['fa', 'skull-crossbones']" style="color: red" /> Média emissões
                            transportador
                        </div>
                        <div>
                            <div v-if="!products.length" class="content d-flex w-100">
                                <TheNoProduct></TheNoProduct>
                            </div>
                            <div v-else class="row gx-2 justify-content-start">
                                <div class="">
                                    <div class="card p-3 container" style="height:40vh;">
                                        <div class="row me-1">
                                            <div class="col-2">
                                                Item
                                            </div>
                                            <div class="col-2">
                                                Descrição
                                            </div>
                                            <div class="col-2">
                                                Informação Ambiental
                                            </div>
                                            <div class="col-1">
                                                Preço
                                            </div>
                                            <div class="col-2">
                                                Preço transporte
                                            </div>
                                            <div class="col-2">
                                                Quantidade
                                            </div>
                                            <div class="col-1">
                                                Total
                                            </div>

                                        </div>
                                        <!-- <div class="container"> -->
                                        <div class="row h-100" style="overflow-y:auto">
                                            <CartProductCard v-for="p in products" :key="p.id" :product="p"
                                                @getProducts="getProducts"></CartProductCard>
                                        </div>
                                        <!-- </div>     -->
                                    </div>
                                </div>
                            </div>






                             <div class=" ">
                                <div class="card p-3 my-1">
                                    <h2>Resumo:</h2>
                                    <br>
                                    <br>
                                    <div>Consumos renováveis dos fornecedores
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{this.totalSupplierRenewableResources}}%
                                    </div>
                                    <div>Consumos dos fornecedores
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {{this.totalSupplierResourceUsage}} kWh</div>
                                    <div>Consumos dos transportadores
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{this.totalTransporterResourceUsage}}
                                        l/100Km</div>
                                    <div>Emissões dos transportadores &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {{this.totalTransporterEmissions}} CO2 g/Km/t</div>
                                    <br>
                                    <br>
                                    <div class="fw-bold fs-5">Total da encomenda
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {{parseFloat(this.totalPrice).toFixed(2)}}€</div>
                                    <div class="text-end align-self-end ">
                                        <button type="button" @click="removeAllProducts($event)"
                                            class="btn btn-danger me-2 mb-5">Limpar carrinho
                                            <font-awesome-icon :icon="['fa', 'trash']" style="color: " /></button>
                                        <router-link to="/checkout" class="mb-2 ml-2">
                                            <button type="button" class="btn btn-success ps-2 mb-5"
                                                style="background-color: #5E9F88"> Finalizar
                                                <font-awesome-icon :icon="['fa', 'check']" /></button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>