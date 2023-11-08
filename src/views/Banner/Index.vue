<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="-mb24">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                data-unq="banner-input-search"
                                dense
                                v-model="filter.search"
                                outlined
                                filled
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                prepend-inner-icon="search"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code and name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row>
                <v-col>
                    Filter 
                    <v-btn 
                        :data-unq="`banner-filter-hide`"
                        depressed
                        x-small
                        @click="filterDropdown = !filterDropdown"
                        v-if="filterDropdown"
                        class="no-caps fs12"
                    >
                        Hide
                        <v-icon
                            right
                        >
                            expand_less
                        </v-icon>
                    </v-btn>
                    <v-btn 
                        :data-unq="`banner-filter-show`"
                        depressed
                        x-small
                        @click="filterDropdown = !filterDropdown"
                        v-else
                        class="no-caps fs12"
                    >
                        Show
                        <v-icon
                            right
                        >
                            expand_more
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="filterDropdown">
                <v-col cols="12" md="3">
                    <SelectArea 
                        :data-unq="`banner-filter-region`"
                        @selected="regionSelected"
                        :dense="true"
                        :norequired="true"
                        :aux_data="2"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArchetype
                        :data-unq="`banner-filter-archetype`"
                        @selected="archetypeSelected"
                        :norequired="true"
                        :aux_data="2"
                        :dense="true"
                    ></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        :data-unq="`banner-filter-status`"
                        v-model="filter.status"
                        :items="campaign_list.status_options"
                        @change="fetchCampaignList()"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end">
                    <v-row>
                        <v-col>
                            <v-btn
                                :data-unq="`banner-button-createBanner`"
                                depressed
                                color="#50ABA3"
                                :to="{ name: 'BannerCreate' }"
                                class="no-caps"
                                v-privilege="'bnr_crt'" 
                            >
                                <span class="text-white bold">
                                    Create Banner
                                </span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="campaign_list.table_header"
                :items="campaign_list.data"
                :loading="campaign_list.isLoading"
                :items-per-page="pagination.rows_per_page"
                :server-items-length="pagination.total_items"
                @update:items-per-page="getItemPerPage"
                @update:page="getPagination"
                :footer-props="footerProps"
            >
                <template v-slot:item="props">
                    <tr style="height:86px">
                        <td :data-unq="`banner-label-imageUrl-${props.index}`">
                            <v-img
                                class="rounded-form-sm"
                                height="65"
                                width="125"
                                :src="props.item.image_url"
                            ></v-img>
                        </td>
                        <td :data-unq="`banner-label-name-${props.index}`">
                            {{ props.item.name }}<br>
                            <span class="second-color">{{ props.item.code }}</span>
                        </td>
                        <td :data-unq="`banner-label-region-${props.index}`">
                            <div v-if="props.item.region_names.length > 1">
                                <v-tooltip color="black" top>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <span v-on="{ ...tooltip }"> {{ props.item.region_names[0] }}... </span>
                                    </template>
                                    <span> 
                                        {{ arrayToString(props.item.region_names) }} 
                                    </span>
                                </v-tooltip>
                            </div>
                            <div v-else>
                                {{ arrayToString(props.item.region_names) }}
                            </div>
                        </td>
                        <td :data-unq="`banner-label-archetype-${props.index}`">
                            <div v-if="props.item.archetype_names.length > 1">
                                <v-tooltip color="black" top>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <span v-on="{ ...tooltip }"> {{ props.item.archetype_names[0] }}... </span>
                                    </template>
                                    <span> 
                                        {{ arrayToString(props.item.archetype_names) }} 
                                    </span>
                                </v-tooltip>
                            </div>
                            <div v-else>
                                {{ arrayToString(props.item.archetype_names) }}
                            </div>
                        </td>
                        <td :data-unq="`banner-label-redirectTo-${props.index}`">
                            <div v-if="props.item.redirect.to == 1">
                                <a 
                                    v-if="props.item.redirect.value" 
                                    :href="props.item.redirect.value" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    :data-unq="`banner-button-url-${props.index}`"
                                >URL</a>
                                <span v-else>-</span>
                            </div>
                            <div v-else-if="props.item.redirect.to == 2">
                                {{ props.item.redirect.value.name }}
                            </div>
                            <div v-else-if="props.item.redirect.to == 3">
                                {{ props.item.redirect.value.code }} - {{ props.item.redirect.value.description }}
                            </div>
                            <div v-else-if="props.item.redirect.to == 6">
                                {{ props.item.redirect.name }} - {{ props.item.redirect.value.name }}
                            </div>
                            <div v-else>
                                {{ props.item.redirect.name }}
                            </div>
                        </td>
                        <td :data-unq="`banner-label-startAt-${props.index}`">{{ props.item.start_at | moment("DD/MM/YYYY HH:mm") }}</td>
                        <td :data-unq="`banner-label-finishAt-${props.index}`">{{ props.item.finish_at | moment("DD/MM/YYYY HH:mm") }}</td>
                        <td :data-unq="`banner-label-status-${props.index}`">
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('finished')"
                                ><span class="pa-md-2">Finished</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 5">
                                <v-chip
                                    :color="statusMaster('draft')"
                                ><span class="pa-md-2">Draft</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 7">
                                <v-chip
                                    :color="statusMaster('archived')"
                                ><span class="pa-md-2">Archived</span></v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                        :data-unq="`banner-button-actionMenu-${props.index}`"
                                    ><v-icon dark>more_vert</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :data-unq="`banner-button-detail-${props.index}`" 
                                        :to="{name: 'BannerDetail', params: { id: props.item.id }}" 
                                        v-privilege="'bnr_rdd'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>mdi-open-in-new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <div v-if="props.item.status==1 || props.item.status==5">
                                        <hr/>
                                    </div>
                                    <v-list-item 
                                        :data-unq="`banner-button-archive-${props.index}`"
                                        v-if="props.item.status==1 || props.item.status==5" 
                                        @click="handleArchiveModal(true, props.item.id)" 
                                        v-privilege="'bnr_arc'"
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>Archive</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <v-dialog
            :data-unq="`banner-action-modelDialog`"
            v-model="archive.show_archive_modal"
            persistent
            max-width="470px"
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <span class="text-title-modal">Archive Banner</span>
                </v-card-title>
                <v-card-text>
                    <span class="fs16 mt-1">Why was this banner archived?</span>
                    <v-textarea
                        :data-unq="`banner-input-archiveNote`"
                        name="note"
                        v-model="archive.note"
                        :counter="100"
                        maxlength="100"
                        outlined
                        class="mt-6"
                        rows="3"
                    >
                        <template v-slot:label>
                            Note
                        </template>
                    </v-textarea>
                </v-card-text>
                <v-card-actions class="pb-4 -mt6">
                    <v-spacer></v-spacer>
                    <v-btn
                        :data-unq="`banner-button-cancelArchive`"
                        @click="handleArchiveModal(false)"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                    >
                        <span class="text-black80">Cancel</span>
                    </v-btn>
                    <v-btn
                        :data-unq="`banner-button-saveArchive`"
                        depressed
                        color="#50ABA3"
                        class="main-btn white--text"
                        @click="archiveBanner()"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    
    export default {
        name: "BannerList",
        data() {
            return {
                filterDropdown : false,
            }
        }, 
        created() {
            this.$store.commit("setDefaultFilterCampaignList")
            this.$store.commit("resetPagination")
        },
        computed: {
            ...mapState({
                campaign_list: state => state.banner.campaign_list,
                pagination: state => state.pagination.pagination,
                filter: state => state.banner.campaign_list.filter,
                archive: state => state.banner.archive,
            }),
            footerProps() {
                return {
                    'items-per-page-options':[10,15,20,25],
                    'page-text': `${(this.pagination.page-1)*this.pagination.rows_per_page+1}
                                    - ${Math.min(this.pagination.page*this.pagination.rows_per_page,this.pagination.total_items)} 
                                    of ${this.pagination.total_items}`,
                };
            },
        },
        methods: {
            ...mapActions([
                "fetchCampaignList",
                "archiveBanner",
            ]),
            ...mapMutations([
                "setFilterCampaignList",
                "setDefaultFilterCampaignList",
                "setCampaignListArchiveNote",
                "setShowArchiveModal",
                "setCampaignListArchiveID",
            ]),
            // Convert Array to String
            arrayToString(arr) {
                return String(arr)
            },
            //For Filter by Area
            regionSelected(d){
                this.$store.commit("setFilterCampaignList", {...this.filter, region: "",})
                if(d){
                    this.$store.commit("setFilterCampaignList", {
                        ...this.filter,
                        region: d.id,
                    })
                }
                this.getPagination(1)
                this.fetchCampaignList()
            },
            //For Filter by Archetype
            archetypeSelected(d) {
                this.$store.commit("setFilterCampaignList", {...this.filter, archetype: "",})
                if (d) {
                    this.$store.commit("setFilterCampaignList", {
                        ...this.filter,
                        archetype: d.id,
                    })
                }
                this.getPagination(1)
                this.fetchCampaignList()
            },
            //For Filter by Status
            redirectToSelected(d) {
                this.$store.commit("setFilterCampaignList", {...this.filter, status: "",})
                if (d) {
                    this.$store.commit("setFilterCampaignList", {
                        ...this.filter,
                        status: d.value_int,
                    })
                }
                this.getPagination(1)
                this.fetchCampaignList()
            },
            // For Handling Archive Modal
            handleArchiveModal(handler, id) {
                this.$store.commit("setShowArchiveModal", handler)
                this.$store.commit("setCampaignListArchiveNote", '')
                this.$store.commit("setCampaignListArchivePosition", 'list')
                if (id) {
                    this.$store.commit("setCampaignListArchiveID", id)
                }
            },
            // Count all data for paggination
            getItemPerPage(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    rows_per_page: val,
                })
                this.fetchCampaignList()
            },
            // For paggination
            getPagination(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    page: val,
                })
                this.fetchCampaignList()
            },
        },
        watch: {
            'filter.search': { // to filter by search box
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){ 
                        that.fetchCampaignList()
                    }, 1000);
                },
                deep: true
            },
        },
    }
</script>