<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="mt24">
                <v-col cols="12" md="6">
                    <v-text-field
                        data-unq="banner-input-name"
                        name="name"
                        v-model="form.name"
                        required
                        outlined
                        dense
                        :error-messages="error.name"
                        :counter="20"
                        maxlength="20"
                    >
                        <template v-slot:label>
                            Banner Name<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select
                        :data-unq="`banner-input-queue`"
                        v-model="form.queue"
                        :items="queueNumber"
                        outlined
                        dense
                        required
                        :error-messages="error.queue"
                    >
                        <template v-slot:label>
                            Banner Queue<span class="text-red">*</span>
                        </template>
                    </v-select>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectAreaCheckbox 
                        :data-unq="`banner-input-region`"
                        @selected="areaSelected"
                        :error="error.regions"
                        :dense="true"
                        :aux_data="2"
                        label="Multiselect Region"
                    ></MultiSelectAreaCheckbox>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectArcheTypeCheckbox
                        :data-unq="`banner-input-archetype`"
                        @selected="archetypeSelected"
                        :error="error.archetypes"
                        :dense="true"
                        :aux_data="2"
                        label="Multiselect Archetype"
                    ></MultiSelectArcheTypeCheckbox>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectRedirectTo
                        :data-unq="`banner-input-redireqTo`"
                        @selected="redirectToSelected"
                        :error="error.redirect_to"
                        table="banner"
                        attribute="navigate_type"
                    ></SelectRedirectTo>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        :data-unq="`banner-input-url`"
                        v-if="form.redirect_to == 1"
                        name="navigation_url"
                        v-model="form.redirect_value"
                        maxlength="2084"
                        required
                        outlined
                        :error-messages="error.redirect_value"
                        dense
                    >
                        <template v-slot:label>
                            URL<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                    <SelectProductTag
                        :data-unq="`banner-input-productTag`"
                        v-if="form.redirect_to == 2"
                        :required="true"
                        :dense="true"
                        @selected="redirectValueSelected"
                        :error="error.redirect_value"
                    ></SelectProductTag>
                    <SelectProduct
                        :data-unq="`banner-input-product`"
                        v-if="form.redirect_to == 3"
                        :required="true"
                        :dense="true"
                        @selected="redirectValueSelected"
                        :error="error.redirect_value"
                    ></SelectProduct>
                    <SelectProductSection
                        :data-unq="`banner-input-productSection`"
                        v-if="form.redirect_to == 6"
                        :area="form.areas"
                        :required="true"
                        :archetype="form.archetypes"
                        @selected="redirectValueSelected"
                        :error="error.redirect_value"
                    ></SelectProductSection>
                </v-col>
                <v-col cols="12" md="6" class="-mt24 mb24">
                    <v-card elevation="0" outlined>
                        <v-card-text>
                            <div class="fs16 text-black">Start Time</div>
                        </v-card-text>
                        <v-card-text class="-mt12 -mb10">
                            <v-row>
                                <v-col>
                                    <v-menu
                                        :data-unq="`banner-input-startAtModel`"
                                        ref="menu"
                                        v-model="start_at_model"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <div v-on="on">
                                                <v-text-field
                                                    :data-unq="`banner-input-startAt`"
                                                    name="start_at"
                                                    prepend-inner-icon="date_range"
                                                    outlined
                                                    v-model="start_at"
                                                    maxlength="10"
                                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                                    :error-messages="error.start_at"
                                                    clearable
                                                    @click:clear="start_at = ''"
                                                    dense
                                                >
                                                    <template v-slot:label>
                                                        Start Date<span class="text-red">*</span>
                                                    </template>
                                                </v-text-field>
                                            </div>
                                        </template>
                                        <v-date-picker
                                            :data-unq="`banner-input-startAt`"
                                            v-model="start_at"
                                            @input="start_at_model = false"
                                            :min="current_date"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col>
                                    <v-menu
                                        :data-unq="`banner-input-startTimeModel`"
                                        ref="menuTime"
                                        v-model="start_time_model"
                                        :close-on-content-click="false"
                                        :return-value.sync="start_time"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                :data-unq="`banner-input-startTime`"
                                                name="start_time"
                                                prepend-inner-icon="schedule"
                                                outlined
                                                clearable
                                                maxlength="5"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                @click:clear="start_time = ''"
                                                v-model="start_time"
                                                :value="timeNow"
                                                :error-messages="error.start_at"
                                                dense
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <template v-slot:label>
                                                    Start Time<span class="text-red">*</span>
                                                </template>
                                            </v-text-field>
                                        </template>
                                        <v-time-picker
                                            format="24hr"
                                            :min="checkTimeStart"
                                            v-if="start_time_model"
                                            v-model="start_time"
                                            full-width
                                            @click:minute="$refs.menuTime.save(start_time)"
                                        ></v-time-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" class="-mt24 mb24">
                    <v-card elevation="0" outlined>
                        <v-card-text>
                            <div class="fs16 text-black">End Time</div>
                        </v-card-text>
                        <v-card-text class="-mt12 -mb10">
                            <v-row>
                                <v-col>
                                    <v-menu
                                        :data-unq="`banner-input-finishAtModel`"
                                        ref="menu"
                                        v-model="finish_at_model"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <div v-on="on">
                                                <v-text-field
                                                    :data-unq="`banner-input-finishAt`"
                                                    name="finish_at"
                                                    prepend-inner-icon="date_range"
                                                    outlined
                                                    v-model="finish_at"
                                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                                    :error-messages="error.finish_at"
                                                    clearable
                                                    @click:clear="finish_at = ''"
                                                    dense
                                                >
                                                    <template v-slot:label>
                                                        End Date<span class="text-red">*</span>
                                                    </template>
                                                </v-text-field>
                                            </div>
                                        </template>
                                        <v-date-picker
                                            v-model="finish_at"
                                            @input="finish_at_model = false"
                                            :min="current_date"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col>
                                    <v-menu
                                        :data-unq="`banner-input-endTimeModel`"
                                        ref="menuEndTime"
                                        v-model="end_time_model"
                                        :close-on-content-click="false"
                                        :return-value.sync="end_time"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                :data-unq="`banner-input-endTime`"
                                                name="end_time"
                                                prepend-inner-icon="schedule"
                                                outlined
                                                clearable
                                                maxlength="5"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                @click:clear="end_time = ''"
                                                v-model="end_time"
                                                :error-messages="error.finish_at"
                                                dense
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <template v-slot:label>
                                                    End Time<span class="text-red">*</span>
                                                </template>
                                            </v-text-field>
                                        </template>
                                        <v-time-picker
                                            format="24hr"
                                            :min="checkTimeEnd"
                                            v-if="end_time_model"
                                            v-model="end_time"
                                            full-width
                                            @click:minute="$refs.menuEndTime.save(end_time)"
                                        ></v-time-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <UploadImageBanner 
                        :data-unq="`banner-input-imageUrl`"
                        :minWidth="360"
                        :minHeight="180"
                        :maxSize="1000"
                        :forImgName="form.name"
                        :errorMsg="error.image_url"
                        :type="'product-tag'"
                        :extention="'jpeg'"
                        :accept="'image/jpeg,image/jpg'"
                    ></UploadImageBanner>
                    <v-btn
                        :data-unq="`banner-button-preview`"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="only-btn mt10"
                        width="360"
                        @click="preview=true"
                        :disabled="checkImg"
                    >
                        <span v-if="checkImg == false" class="text-secondary"><v-icon class="ml16">visibility</v-icon> Preview</span>
                        <span v-else><v-icon class="ml16">visibility</v-icon> Preview</span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :data-unq="`banner-button-cancel`"
                            depressed
                            outlined
                            color="#EBEBEB" 
                            class="main-btn"
                            @click="$router.go(-1)"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            :data-unq="`banner-button-save`"
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                            v-privilege="'bnr_crt'"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <v-dialog
            :data-unq="`banner-action-preview`"
            v-model="preview"
            persistent
            max-width="800px"
        >
            <LoadingBar :value="overlay"/>
            <v-card class="OpenSans">
                <v-card-title>
                    <v-row>
                        <v-col class="text-title-modal" md="6">
                            Preview
                        </v-col>
                        <v-col class="flex-align-end" md="6">
                            <v-btn
                                icon
                                @click="preview=false"
                            >
                                <v-img :src="IconClose" max-height="24px" max-width="24px"></v-img>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-actions class="pb-4">
                    <div class="img-bnr-frame">
                        <v-img
                            data-unq="`banner-image-imgMobileView`"
                            class="absolute mt10"
                            width="360"
                            :src="ImgMobileView"
                        ></v-img>
                        <v-img
                            data-unq="`banner-image-ImgMobileFrame`"
                            class="relative"
                            width="427"
                            :src="ImgMobileFrame"
                        ></v-img>
                        <v-img
                            data-unq="`banner-image-imagePreview`"
                            class="absolute img-bnr-preview"
                            width="360"
                            height="180"
                            :src="form.image_url"
                        >
                            <div class="absolute ml15">   
                                <span v-for="index in 5" :key="index">
                                    <span v-if="index == form.queue" class="long-dot"></span>
                                    <span v-else class="dot"></span>
                                </span>
                            </div>
                        </v-img>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<style>
.absolute{
    position: absolute;
}
.relative{
    position: relative;
}
.img-bnr {
    border-radius: 15px;
    border: 1px solid #C2C2C2;
    box-sizing: border-box;
    background: #FCFCFC;
    width:360px;
    height: 182px;
    text-align: center;
}
.img-bnr-frame {
    margin-left: auto; 
    margin-right: auto; 
    height: auto; 
    justify-content: center; 
    align-items: center; 
    display: inline-flex;
}
.img-bnr-preview {
    margin-top: -355px; 
}
.img-ep {
    border-radius: 15px;
    border: 1px solid #C2C2C2;
    box-sizing: border-box;
    background: #FCFCFC;
    width:328px;
    height: 328px;
    text-align: center;
}
</style>
<script>
    import { mapState, mapActions } from "vuex";
    import { IconClose, ImgMobileView, ImgMobileFrame } from "@vue-mf/global";
    export default {
        name: "BannerCreate",
        data() {
            return {
                ConfirmData: {},
                IconClose : IconClose,
                ImgMobileView : ImgMobileView,
                ImgMobileFrame : ImgMobileFrame,
                start_time_model: '',
                start_time: '',
                start_at_model: '',
                start_at: new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
                current_date: new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
                finish_at_model: '',
                finish_at: '',
                end_time_model: '',
                end_time: '23:59',
                preview: false,
                error: {},
                overlay: false,
            }
        },
        mounted() {
            let self = this
            this.$root.$on('event_error', function (err) {
                self.error = err;
                self.imageError = err.image;
            });
            this.$root.$on('event_uploadImage', function (image) {
                self.form.image_url = image
            });
        },
        computed: {
            ...mapState({
                form: state => state.banner.campaign_create.form,
                queueNumber: state => state.banner.campaign_create.queueNumber,
            }),
            // Check and save current time
            timeNow() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.start_time === "") {
                    return this.start_time = time
                }
            },
            // Check for min time
            checkTimeStart() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.current_date == this.start_at) {
                    return time
                }
            },
            // Check for min time
            checkTimeEnd() {
                const d = new Date();
                let h = (d.getHours() < 10 ? '0' : '') + d.getHours();
                let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
                const time = h + ':' + m
                if (this.current_date == this.finish_at) {
                    return time
                }
            },
            // Check image
            checkImg() {
                if(this.form.image_url){
                    return false
                }else{
                    return true
                }
            }
        },
        watch:{
            error: {
                handler: function (val) { // if any error, auto scroll to error position
                    if(val){
                        setTimeout(() => {
                            const element = document.querySelector(".v-messages__message:first-of-type");
                            if(element){
                                element.scrollIntoView({block: "center", inline: "center"});
                            }
                        }, 500);
                    }
                },
                deep: true
            },
        },
        created() {
            this.fetchCampaignCreate()
        },
        methods: {
            ...mapActions([
                "fetchCampaignCreate"
            ]),
            //For send data to API
            confirmButton() {
                if (this.start_at && this.start_time) {
                    let value = this.start_at + 'T' + this.start_time
                    let date = this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
                    this.$store.commit('setStartDateCampaignCreate', date)
                } else {
                    this.$store.commit('setStartDateCampaignCreate', null)
                }
                if (this.finish_at && this.end_time) {
                    let value = this.finish_at + 'T' + this.end_time
                    let date = this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
                    this.$store.commit('setEndDateCampaignCreate', date)
                } else {
                    this.$store.commit('setEndDateCampaignCreate', null)
                }
                if (this.form.redirect_to == 1) {
                    if (!this.form.redirect_value.includes('?hidenavbar=1') && this.form.redirect_value.includes('/blog/')) {
                        this.form.redirect_value += "?hidenavbar=1"
                    }
                }
                this.error.image_url = ''
                this.ConfirmData = {
                    model: true,
                    title: "Create Banner",
                    text: "Are you sure want to create this Banner?",
                    urlApi: "/campaign/v1/banner",
                    nextPage: "/campaign/banner",
                    post: true,
                    data: this.form
                }
            },
            areaSelected(d) { //For select area and set id
                this.form.regions = [];
                if (d) {
                    d.forEach(e => {
                        this.$store.commit('setAreaCampaignCreate', e.id)
                    });
                }
            },
            archetypeSelected(d) { //For select archetype and set id
                this.form.archetypes = [];
                if (d) {
                    d.forEach(e => {
                        this.$store.commit('setArchetypeCampaignCreate', e.id)
                    });
                }
            },
            redirectToSelected(d) { //For select redirect_to and set id
                this.$store.commit('setRedirectToCampaignCreate', "")
                if (d) {
                    this.$store.commit('setRedirectToCampaignCreate', d.value_int)
                    if (d.value_int === 1) {
                        this.form.redirect_value = 'https://'
                    }
                }
            },
            redirectValueSelected(d) { //For select redirect_value (product) and set id
                this.$store.commit('setRedirectValueCampaignCreate', '')
                if (d) {
                    this.$store.commit('setRedirectValueCampaignCreate', d.id)
                }
            },
        },
    }
</script>
