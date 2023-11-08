<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <div class="img-bnr ma-3">
                    <v-img
                        class="rounded-form"
                        height="180"
                        width="360"
                        :src="campaign_detail.image_url ?? ''"
                    ></v-img>
                </div>
            </v-row>
            <v-row>
                <v-col class="fs24 bold">
                    {{campaign_detail.name ?? '-'}}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <div v-if="campaign_detail.status == 1">
                        <v-btn
                            elevation="0"
                            rounded
                            depressed
                            small
                            class="no-caps mb4"
                            :color="statusMaster('active')"
                        >
                            Active
                        </v-btn>
                    </div>
                    <div v-if="campaign_detail.status == 2">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4 w104"
                            :color="statusMaster('finished')"
                        >
                            Finished
                        </v-btn>
                    </div>
                    <div v-if="campaign_detail.status == 5">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4 w104"
                            :color="statusMaster('draft')"
                        >
                            Draft
                        </v-btn>
                    </div>
                    <div v-if="campaign_detail.status == 7">
                        <v-btn
                            elevation="0"
                            rounded
                            small
                            class="no-caps mb4 w104"
                            :color="statusMaster('archived')"
                        >
                            Archived
                        </v-btn>
                    </div>
                    <v-menu offset-y >
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item 
                                v-if="campaign_detail.status==1 || campaign_detail.status==5"
                                @click="handleArchiveModal(true, campaign_detail.id)" 
                                v-privilege="'bnr_arc'"
                                :data-unq="`campaignDetail-button-archive-${campaign_detail.id}`"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div v-if="campaign_detail.status==1 || campaign_detail.status==5" >
                                <hr/>
                            </div>
                            <v-list-item @click="seeHistory()">
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="-mb36">
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Code'" :value="campaign_detail.code ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Banner Queue'" :value="campaign_detail.queue ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Start Time'" :value="campaign_detail.start_at | moment('DD/MM/YYYY HH:mm') "/>
                </v-col>
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'End Time'" :value="campaign_detail.finish_at | moment('DD/MM/YYYY HH:mm')"/>
                </v-col>
                <v-col cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Redirect To'" :value="campaign_detail.redirect?.name ?? '-'"/>
                </v-col>
                <v-col v-if="campaign_detail.redirect?.to == 1 && campaign_detail.redirect?.value.length > 30" cols="12" md="12" class="-mb24">
                    <DetailRowNew  :name="'URL'" :value="campaign_detail.redirect?.value" :crossURL="campaign_detail.redirect?.value"/>
                </v-col>
                <v-col v-else-if="campaign_detail.redirect?.to == 1 && campaign_detail.redirect?.value.length <= 30" cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'URL'" :value="campaign_detail.redirect?.value" :crossURL="campaign_detail.redirect?.value"/>
                </v-col>
                <v-col v-else-if="campaign_detail.redirect?.to == 2" cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Item Category'" :value="campaign_detail.redirect?.value.name"/>
                </v-col>
                <v-col v-else-if="campaign_detail.redirect?.to == 3" cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Item'" :value="campaign_detail.redirect?.value.code + ' - ' +campaign_detail.redirect?.value.description"/>
                </v-col>
                <v-col v-else-if="campaign_detail.redirect?.to == 6" cols="12" md="6" class="-mb24">
                    <DetailRowNew :name="'Item Section'" :value="campaign_detail.redirect?.value.name"/>
                </v-col>
                <v-col cols="12" class="-mb24">
                    <DetailRowNew :name="'Region'" :value="arrayToString(campaign_detail.region_names)" :align="true"/>
                </v-col>
                <v-col cols="12" class="mb24">
                    <DetailRowNew :name="'Archetype'" :value="arrayToString(campaign_detail.archetype_names)" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <v-dialog
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
                        name="note"
                        v-model="archive.note"
                        :counter="100"
                        maxlength="100"
                        outlined
                        class="mt-6"
                        rows="3"
                        :data-unq="`campaignDetail-input-archiveNote-${campaign_detail.id}`"
                    >
                        <template v-slot:label>
                            Note
                        </template>
                    </v-textarea>
                </v-card-text>
                <v-card-actions class="pb-4 -mt6">
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="handleArchiveModal(false)"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                        :data-unq="`campaignDetail-button-cancelArchive-${campaign_detail.id}`"
                    >
                        <span class="text-black80">Cancel</span>
                    </v-btn>
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="main-btn white--text"
                        @click="archiveBanner()"
                        :data-unq="`campaignDetail-button-archive-${campaign_detail.id}`"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <AuditLogNew :data="dataAuditLog"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    
    export default {
        name: "BannerDetail",
        data() {
            return {
                dataAuditLog: {},
                archiveData: ''
            }
        },
        computed: {
            ...mapState({
                campaign_detail: state => state.banner.campaign_detail.data,
                archive: state => state.banner.archive,
            }),
        },
        methods:{
            ...mapActions([
                "fetchCampaignDetail",
                "archiveBanner"
            ]),
            ...mapMutations([
                "setShowArchiveModal",
                "setCampaignListArchiveID",
                "setCampaignListArchiveNote",
            ]),
            //Convert arry to string
            arrayToString(arr) {
                return String(arr)
            },
            //For geting history data
            seeHistory() {
                this.dataAuditLog = {
                    model: true,
                    id: this.$route.params.id,
                    type: "banner"
                }
            },
            // For Handling Archive Modal
            handleArchiveModal(handler, id) {
                this.$store.commit("setShowArchiveModal", handler)
                this.$store.commit("setCampaignListArchivePosition", 'detail')
                this.$store.commit("setCampaignListArchiveNote", '')
                if (id) {
                    this.$store.commit("setCampaignListArchiveID", id)
                }
            },
        },
        mounted() {
            this.fetchCampaignDetail(this.$route.params.id)
        },
    }
</script>