from django.contrib import admin
from .models import ClientQuotation


class ClientQuotationAdmin(admin.ModelAdmin):
    list_display = ('get_account', 'get_account_phone', 'address_from', 'address_to', 'service_date', 'get_truck', 'final_price', 'created')

    def get_account(self, obj):
        return obj.lead.first_name + ' ' + obj.lead.last_name

    def get_account_phone(self, obj):
        return obj.lead.phone_number

    def get_truck(self, obj):
        return obj.truck_size_type.name

    get_account.short_description = 'Account'
    get_account_phone.short_description = 'Phone Number'
    get_truck.short_description = 'Truck Size'


admin.site.register(ClientQuotation, ClientQuotationAdmin)
