<template>
    <v-container fill-height class="main-container">
        <div class="box-title fs16 bold">
            Basic Info
        </div>
        <div class="box-body">
            <v-row class="mt-6">
                <v-col cols="12" md="12" class="-mt24">
                    <v-text-field
                        data-unq="notification-input-campaignName"
                        name="campaign_name"
                        v-model="form.campaign_name"
                        required
                        :counter="100"
                        maxlength="100"
                        outlined
                        :error-messages="notification_create.error.campaign_name"
                        dense
                    >
                        <template v-slot:label>
                            Campaign Name<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectAreaCheckbox 
                        data-unq="notification-input-region"
                        @selected="areaSelected"
                        :error="notification_create.error.regions"
                        :aux_data="2"
                        :area="notification_create.regions"
                    ></MultiSelectAreaCheckbox>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectArcheTypeCheckbox 
                        data-unq="notification-input-archetype"
                        @selected="archetypeSelected"
                        :error="notification_create.error.archetypes"
                        :archeType="notification_create.archetypes"
                        :aux_data="2"
                    ></MultiSelectArcheTypeCheckbox>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectRedirectTo
                        data-unq="notification-input-redirectTo"
                        @selected="redirectToSelected"
                        :error="notification_create.error.redirect_to"
                        :redirect_to="notification_create.redirect_to"
                        :attribute="'redirect_to'"
                        :table="'notification_campaign'"
                    ></SelectRedirectTo>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectProduct
                        data-unq="notification-input-product"
                        v-if="form.redirect_to === 1"
                        :required="true"
                        :dense="true"
                        @selected="redirectValueSelected"
                        :error="notification_create.error.redirect_value"
                    ></SelectProduct>
                    <SelectProductTag
                        data-unq="notification-input-productTag"
                        v-if="form.redirect_to === 2"
                        :required="true"
                        :dense="true"
                        @selected="redirectValueSelected"
                        :error="notification_create.error.redirect_value"
                    ></SelectProductTag>
                    <v-text-field
                        data-unq="notification-input-redirectValue"
                        v-if="form.redirect_to === 4"
                        name="redirect_value"
                        v-model="form.redirect_value"
                        maxlength="2084"
                        required
                        outlined
                        :error-messages="notification_create.error.redirect_value"
                        dense
                    >
                        <template v-slot:label>
                            URL<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </div>
        <div class="box-title-end fs16 bold">
            Push Notification Info
        </div>
        <div class="box-body">
            <v-row class="mt-6">
                <v-col cols="12" md="12" class="-mt24">
                    <v-text-field
                        data-unq="notification-input-title"
                        name="title"
                        v-model="form.title"
                        required
                        outlined
                        :counter="100"
                        maxlength="100"
                        :error-messages="notification_create.error.title"
                        dense
                    >
                        <template v-slot:label>
                           Notification Title<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <v-textarea
                        data-unq="notification-input-message"
                        name="message"
                        v-model="form.message"
                        :counter="150"
                        maxlength="150"
                        outlined
                        rows="3"
                        :error-messages="notification_create.error.message"
                    >
                        <template v-slot:label>
                           Message<span class="text-red">*</span>
                        </template>
                    </v-textarea>
                </v-col>
            </v-row>
        </div>
        <div class="mx12 mb12 -mt4 wp100">
            <v-row>
                <v-col cols="12" md="6">
                    <div class="box-col">
                        <div class="fs14 bold">
                            Schedule Push Notification
                        </div>
                        <div class="w130">
                            <v-switch
                                data-unq="notification-button-pushNow"
                                message
                                v-model="form.push_now"
                                inset
                                :true-value="1"
                                :false-value="2"
                                color="#50ABA3"
                            >
                                <template v-slot:label>
                                    <span class="fs14">Push Now</span>
                                </template>
                            </v-switch>
                        </div>
                        <v-row v-if="form.push_now === 2">
                            <v-col>
                                <v-menu
                                    :data-unq="`notification-input-sendDateModel`"
                                    ref="menu"
                                    v-model="notification_create.send_date_model"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <div v-on="on">
                                            <v-text-field
                                                :data-unq="`notification-input-sendDate`"
                                                name="send_date"
                                                prepend-inner-icon="mdi-calendar"
                                                outlined
                                                v-model="notification_create.send_date"
                                                maxlength="10"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"
                                                :error-messages="notification_create.error.scheduled_at"
                                                clearable
                                                v-on="on" 
                                                v-bind="attrs"
                                                @click:clear="notification_create.send_date = ''"
                                                dense
                                            >
                                                <template v-slot:label>
                                                    Send Date<span style="color:red">*</span>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </template>
                                    <v-date-picker
                                        v-model="notification_create.send_date"
                                        @input="notification_create.send_date_model = false"
                                        :min="notification_create.min_date"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu
                                    :data-unq="`notification-input-sendTimeModel`"
                                    ref="menuTime"
                                    v-model="notification_create.send_time_model"
                                    :close-on-content-click="false"
                                    :return-value.sync="notification_create.send_time"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <div v-on="on" v-bind="attrs">
                                            <v-text-field
                                                :data-unq="`notification-input-sendTime`"
                                                name="send_time"
                                                prepend-inner-icon="mdi-clock-outline"
                                                outlined
                                                v-on="on" 
                                                readonly
                                                v-bind="attrs"
                                                clearable
                                                maxlength="5"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                @click:clear="notification_create.send_time = ''"
                                                v-model="notification_create.send_time"
                                                :error-messages="notification_create.error.scheduled_at"
                                                dense
                                            >
                                                <template v-slot:label>
                                                    Send Time<span style="color:red">*</span>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </template>
                                    <v-time-picker
                                        format="24hr"
                                        v-if="notification_create.send_time_model"
                                        v-model="notification_create.send_time"
                                        full-width
                                        :allowed-minutes="allowedMinutes"
                                        @click:minute="$refs.menuTime.save(notification_create.send_time)"
                                    ></v-time-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </div>
        <div class="box-end">
            <v-row class="-ma16">
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :data-unq="`notification-button-cancel`"
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            :data-unq="`notification-button-save`"
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                            v-privilege="'pnt_crt'"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <ConfirmationDialogNew :data-unq="`notification-input-confirmDialog`" :sendData="notification_create.ConfirmData"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name : 'PushNotificationCreate',
        data () {
            return {
            }
        },
        computed: {
            ...mapState({
                notification_create: state => state.notification.create_notification,
                form: state => state.notification.create_notification.form
            }),
        },
        created() {
            this.fetchNotificationCreate()
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.notification_create.error = err
            });
        },
        methods:{
            ...mapActions([
                "fetchNotificationCreate"
            ]),
            // Allow menit hanya kelipatan 10 
            allowedMinutes: m => m % 10 === 0,
            // For send data to api
            confirmButton() {
                if (this.form.push_now === 2) {
                    if (this.notification_create.send_date && this.notification_create.send_time) {
                        let value = this.notification_create.send_date + 'T' + this.notification_create.send_time
                        this.$store.commit("setFormNotificationCreate", {...this.form, scheduled_at: this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ'),})
                    } else {
                        this.$store.commit("setFormNotificationCreate", {...this.form, scheduled_at: null,})
                    }
                } else {
                    this.$store.commit("setFormNotificationCreate", {...this.form, scheduled_at: this.$moment(new Date).format('YYYY-MM-DDTHH:mm:ssZ'),})
                }
                this.notification_create.ConfirmData = {
                    model : true,
                    title : "Create Push Notification",
                    text : "Are you sure want to Create this Push Notification?",
                    urlApi : '/campaign/v1/push_notification',
                    nextPage : '/campaign/push-notification',
                    post : true,
                    data : this.form
                }
            },
            areaSelected(d) { // for select area and set id
                this.$store.commit("setFormNotificationCreate", {...this.form, regions: [],})
                let arr = []
                if (d) {
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                    this.$store.commit("setFormNotificationCreate", {...this.form, regions: arr,})
                }
            },
            archetypeSelected(d) { // for select archetype and set id
                this.$store.commit("setFormNotificationCreate", {...this.form, archetypes: [],})
                let arr = []
                if (d) {
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                this.$store.commit("setFormNotificationCreate", {...this.form, archetypes: arr,})
                }
            },
            redirectToSelected(d) { // for select redirect_to and set id
                this.$store.commit("setFormNotificationCreate", {
                    ...this.form, 
                    redirect_to: 0 ,
                    redirect_value: ''
                })
                if (d) {
                    this.$store.commit("setFormNotificationCreate", {...this.form, redirect_to: d.value_int})
                    if (d.value_int === 4) {
                        this.$store.commit("setFormNotificationCreate", {...this.form, redirect_value: 'https://'})
                    }
                }
            },
            redirectValueSelected(d) { // for select redirect_value (product) and set id
                this.$store.commit("setFormNotificationCreate", {...this.form, redirect_value: ''})
                if (d) {
                    this.$store.commit("setFormNotificationCreate", {...this.form, redirect_value: d.id.toString()})
                }
            },
        },
    }
</script>