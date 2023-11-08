<template>
    <v-container fill-height class="main-container">
        <div class="box-title fs16 bold">
            Basic Info
        </div>
        <div class="box-body">
            <v-row class="mt-6">
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        data-unq="notification-input-code"
                        name="code"
                        v-model="update_notification.form.code"
                        required
                        outlined
                        :error-messages="update_notification.error.code"
                        dense
                        disabled
                    >
                        <template v-slot:label>
                            Code<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        data-unq="notification-input-campaignName"
                        name="campaign_name"
                        v-model="update_notification.form.campaign_name"
                        required
                        outlined
                        :counter="100"
                        maxlength="100"
                        :error-messages="update_notification.error.campaign_name"
                        dense
                    >
                        <template v-slot:label>
                            Campaign Name<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectAreaCheckbox 
                        :data-unq="`notification-input-region`"
                        @selected="areaSelected"
                        :error="update_notification.error.regions"
                        :aux_data="2"
                        :area="update_notification.obj.region"
                    ></MultiSelectAreaCheckbox>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <MultiSelectArcheTypeCheckbox 
                        :data-unq="`notification-input-archetype`"
                        @selected="archetypeSelected"
                        :error="update_notification.error.archetypes"
                        :archeType="update_notification.obj.archetype"
                        :aux_data="2"
                    ></MultiSelectArcheTypeCheckbox>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectRedirectTo
                        :data-unq="`notification-input-redirectTo`"
                        @selected="redirectToSelected"
                        :error="update_notification.error.redirect_to"
                        :redirect_to="update_notification.obj.redirect"
                        :attribute="'redirect_to'"
                        :table="'notification_campaign'"
                    ></SelectRedirectTo>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <SelectProduct
                        :data-unq="`notification-input-product`"
                        v-if="update_notification.form.redirect_to === 1"
                        :required="true"
                        :dense="true"
                        @selected="redirectValueSelected"
                        :product="update_notification.obj.product"
                        :error="update_notification.error.redirect_value"
                    ></SelectProduct>
                    <SelectProductTag
                        :data-unq="`notification-input-productTag`"
                        v-if="update_notification.form.redirect_to === 2"
                        :required="true"
                        :product_tag="update_notification.obj.product_tag"
                        :dense="true"
                        @selected="redirectValueSelected2"
                        :error="update_notification.error.redirect_value"
                    ></SelectProductTag>
                    <v-text-field
                        data-unq="notification-input-redirectValue"
                        v-if="update_notification.form.redirect_to === 4"
                        name="redirect_value"
                        v-model="update_notification.form.redirect_value"
                        maxlength="2084"
                        required
                        outlined
                        :error-messages="update_notification.error.redirect_value"
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
                        v-model="update_notification.form.title"
                        required
                        outlined
                        :counter="100"
                        maxlength="100"
                        :error-messages="update_notification.error.title"
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
                        v-model="update_notification.form.message"
                        :counter="150"
                        maxlength="150"
                        outlined
                        rows="3"
                        :error-messages="update_notification.error.message"
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
                                :data-unq="`notification-button-pushNow`"
                                v-model="update_notification.form.push_now"
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
                        <v-row v-if="update_notification.form.push_now === 2">
                            <v-col>
                                <v-menu
                                    :data-unq="`notification-action-sendDateModel`"
                                    ref="menu"
                                    v-model="update_notification.send_date_model"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <div v-on="on">
                                            <v-text-field
                                                :data-unq="`notification-action-sendDate`"
                                                name="send_date"
                                                prepend-inner-icon="mdi-calendar"
                                                outlined
                                                v-model="update_notification.obj.send_date"
                                                maxlength="10"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 45"
                                                :error-messages="update_notification.error.scheduled_at"
                                                clearable
                                                v-on="on" 
                                                v-bind="attrs"
                                                @click:clear="update_notification.obj.send_date = ''"
                                                dense
                                            >
                                                <template v-slot:label>
                                                    Send Date<span style="color:red">*</span>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </template>
                                    <v-date-picker
                                        :data-unq="`notification-action-sendDate`"
                                        v-model="update_notification.obj.send_date"
                                        @input="update_notification.send_date_model = false"
                                        :min="update_notification.min_date"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu
                                    :data-unq="`notification-action-sendTimeModel`"
                                    ref="menuTime"
                                    v-model="update_notification.send_time_model"
                                    :close-on-content-click="false"
                                    :return-value.sync="update_notification.obj.send_time"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <div v-on="on" v-bind="attrs">
                                            <v-text-field
                                                :data-unq="`notification-action-sendTime`"
                                                name="send_time"
                                                prepend-inner-icon="mdi-clock-outline"
                                                outlined
                                                clearable
                                                v-on="on" 
                                                readonly
                                                v-bind="attrs"
                                                maxlength="5"
                                                onkeypress="return event.charCode >= 48 && event.charCode <= 58"
                                                @click:clear="update_notification.obj.send_time = ''"
                                                v-model="update_notification.obj.send_time"
                                                :error-messages="update_notification.error.scheduled_at"
                                                dense
                                            >
                                                <template v-slot:label>
                                                    Send Time<span style="color:red">*</span>
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </template>
                                    <v-time-picker
                                        :data-unq="`notification-action-sendTime`"
                                        format="24hr"
                                        v-if="update_notification.send_time_model"
                                        v-model="update_notification.obj.send_time"
                                        full-width
                                        :allowed-minutes="allowedMinutes"
                                        @click:minute="$refs.menuTime.save(update_notification.obj.send_time)"
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
                            :data-unq="`notification-button-cancelUpdate`"
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            :data-unq="`notification-button-saveUpdate`"
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                            v-privilege="'pnt_upd'"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <LoadingBar :data-unq="`notification-action-loading`" :value="update_notification.overlay"/>
        <ConfirmationDialogNew :data-unq="`notification-action-confirm`" :sendData="update_notification.confirm_data"/>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name : 'PushNotificationUpdate',
        created () {
            this.fetchNotificationUpdate({id: this.$route.params.id});
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.update_notification.error = err
            });
            setTimeout(() => {
                if(this.update_notification.form.redirect_to === 1){
                    this.redirectValueSelected(this.update_notification.obj.redirect.value)
                }
                else if(this.update_notification.form.redirect_to === 2){
                    this.redirectValueSelected2(this.update_notification.obj.redirect.value)
                }
            }, 2500);
        },
        computed: {
            ...mapState({
                update_notification: state => state.notification.update_notification,
            })
        },
        methods:{
            ...mapActions([
                'fetchNotificationUpdate'
            ]),
            allowedMinutes: m => m % 10 === 0, // Allow menit hanya kelipatan 10
            confirmButton() { // for send data to api
                if (this.update_notification.form.push_now === 2) {
                    if (this.update_notification.obj.send_date && this.update_notification.obj.send_time) {
                        let value = this.update_notification.obj.send_date + 'T' + this.update_notification.obj.send_time
                        this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, scheduled_at: this.$moment(value).format('YYYY-MM-DDTHH:mm:ssZ'),})
                    } else {
                        this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, scheduled_at: null,})
                    }
                } else {
                    this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, scheduled_at: this.$moment(new Date).format('YYYY-MM-DDTHH:mm:ssZ'),})
                }
                this.update_notification.confirm_data = {
                    model : true,
                    title : "Update Push Notification",
                    text : "Are you sure want to Update this Push Notification?",
                    urlApi : '/campaign/v1/push_notification/'+ this.$route.params.id,
                    nextPage : '/campaign/push-notification',
                    data : this.update_notification.form
                }
            },
            areaSelected(d) { // for select area and set id
                this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, regions: [],})
                let arr = []
                if (d) {
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                    this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, regions: arr,})
                }
            },
            archetypeSelected(d) { // for select archetype and set id
                this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, archetypes: [],})
                let arr = []
                if (d) {
                    d.forEach(e => {
                        arr.push(e.id)
                    });
                this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, archetypes: arr,})
                }
            },
            redirectToSelected(d) { // for select redirect_to and set id
                this.$store.commit("setFormNotificationUpdate", {
                    ...this.update_notification.form, 
                    redirect_to: 0 ,
                    redirect_value: ''
                })
                if (d) {
                    this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, redirect_to: d.value_int})
                    if (d.value_int === 4) {
                        this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, redirect_value: 'https://'})
                    }
                }
            },
            redirectValueSelected(d) { // for select redirect_value (product) and set id
                this.$store.commit("setObjNotificationUpdate", {...this.update_notification.obj, product: ''})
                this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, redirect_value: ''})
                if (d) {
                    this.$store.commit("setObjNotificationUpdate", {...this.update_notification.obj, product: d})
                    this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, redirect_value: d.id.toString()})
                }
            },
            redirectValueSelected2(d) { // for select redirect_value (product) and set id
                this.$store.commit("setObjNotificationUpdate", {...this.update_notification.obj, product_tag: ''})
                this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, redirect_value: ''})
                if (d) {
                    this.$store.commit("setObjNotificationUpdate", {...this.update_notification.obj, product_tag: d})
                    this.$store.commit("setFormNotificationUpdate", {...this.update_notification.form, redirect_value: d.id.toString()})
                }
            },
        },
        watch: {
            'update_notification.form.scheduled_at': { // set date and redirect to
                handler: function (val) {
                    if(this.update_notification.form.scheduled_at !== ''){
                        this.$store.commit("setObjNotificationUpdate", {
                            ...this.update_notification.obj,
                            send_date: this.$moment(this.update_notification.form.scheduled_at).format('YYYY-MM-DD'),
                            send_time: this.$moment(this.update_notification.form.scheduled_at).format('HH:mm')
                        })
                    }
                },
                deep: true
            },
        },
    }
</script>