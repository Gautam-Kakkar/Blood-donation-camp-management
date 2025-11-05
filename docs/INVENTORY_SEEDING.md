# Inventory Seeding Script

## Overview
This script populates the blood inventory with sample blood units for testing and development purposes.

## Usage

### Add blood to inventory (keeps existing data)
```bash
npm run seed:inventory
```

### Clear existing inventory and add fresh data
```bash
npm run seed:inventory:clear
```

## What it does

The script will:
1. Connect to your MongoDB database
2. Find or create an admin user to attribute the additions
3. Create mock donation records for each blood group (multiple donations if needed, since each donation is limited to 2 units max)
4. Add blood units to the inventory using the proper `Inventory.addFromDonation()` method
5. Display a summary of the inventory

**Note:** Since each donation can only contain a maximum of 2 units (per Donation model validation), the script automatically creates multiple donation records to reach the target number of units for each blood group.

## Default Blood Units Added

| Blood Group | Units |
|-------------|-------|
| O+          | 15    |
| O-          | 8     |
| A+          | 12    |
| A-          | 6     |
| B+          | 10    |
| B-          | 5     |
| AB+         | 7     |
| AB-         | 4     |

**Total: 67 units**

## Features

- ✅ Creates proper unit tracking with unique IDs
- ✅ Sets expiry dates (35 days from collection)
- ✅ Links units to donation records
- ✅ Records history entries
- ✅ Displays inventory summary after seeding

## Example Output

```
🔌 Connecting to MongoDB...
✅ MongoDB connected successfully!

📦 Using admin user: System Admin (admin@bloodbank.com)

💉 Adding blood units to inventory...

✅ Added 15 unit(s) of O+ blood
✅ Added 8 unit(s) of O- blood
✅ Added 12 unit(s) of A+ blood
✅ Added 6 unit(s) of A- blood
✅ Added 10 unit(s) of B+ blood
✅ Added 5 unit(s) of B- blood
✅ Added 7 unit(s) of AB+ blood
✅ Added 4 unit(s) of AB- blood

📊 Inventory Summary:
──────────────────────────────────────────────────
A+   | Available: 12 | Reserved:  0 | Total: 12
A-   | Available:  6 | Reserved:  0 | Total:  6
AB+  | Available:  7 | Reserved:  0 | Total:  7
AB-  | Available:  4 | Reserved:  0 | Total:  4
B+   | Available: 10 | Reserved:  0 | Total: 10
B-   | Available:  5 | Reserved:  0 | Total:  5
O+   | Available: 15 | Reserved:  0 | Total: 15
O-   | Available:  8 | Reserved:  0 | Total:  8
──────────────────────────────────────────────────
Total units in inventory: 67

🎉 Inventory seeded successfully!
```

## Requirements

- MongoDB connection must be configured in `.env`
- At least one admin user should exist (script will create one if needed)
- Donor profiles should exist for better linking (optional)

## Notes

- Each blood unit has a 35-day shelf life from collection date
- Units are automatically marked as 'available' status
- The script creates mock donations with today's date
- Running multiple times without `--clear` will add more units to existing inventory
