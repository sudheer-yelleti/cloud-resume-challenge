# Retrieve the current client configuration to get the Tenant ID
data "azurerm_client_config" "current" {}

# Create a new Management Group under the Root Tenant Group
resource "azurerm_management_group" "management_groups" {
for_each = {
  "dev" = "cloud-resume-challenge-dev"
  "prod" = "cloud-resume-challenge-prod"
}
  display_name             = each.value
  parent_management_group_id = null
}

# Create subscriptions for each environment
resource "azurerm_subscription" "subscriptions" {
  for_each = {
    dev  = "cloud-resume-challenge-dev"
    prod = "cloud-resume-challenge-prod"
  }
  billing_scope_id = data.azurerm_billing_mca_account_scope.billing.id
  subscription_name = each.value
}

data "azurerm_billing_mca_account_scope" "billing" {
  billing_account_name = "12cd9329-fb91-54d2-9782-c40a099cd0d6:41addaf6-2c7d-47f4-a271-ed76e330c27f_2019-05-31"
billing_profile_name = " Sudheer Yelleti"
invoice_section_name = "Sudheer Yelleti"
}

# Associate subscriptions with management groups
resource "azurerm_management_group_subscription_association" "associations" {
  for_each = {
    dev  = "dev"
    prod = "prod"
  }
  
  management_group_id = azurerm_management_group.management_groups[each.key].id
  subscription_id     = azurerm_subscription.subscriptions[each.key].id
}

# Create resource groups in each subscription
resource "azurerm_resource_group" "resource_groups" {
  for_each = {
    dev  = "cloud-resume-challenge-dev-rg"
    prod = "cloud-resume-challenge-prod-rg"
  }
  
  name     = each.value
  location = "East US"
  
  # Use the subscription provider alias if needed
  depends_on = [azurerm_subscription.subscriptions]
}


