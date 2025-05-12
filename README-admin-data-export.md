# PhysioCare Admin Data Export

This document provides an overview of the data export functionality available to administrators in the PhysioCare system.

## Overview

PhysioCare allows administrators to export various types of data from the system for reporting, analysis, and integration with other systems. The data can be exported in different formats, including CSV (Excel compatible) and JSON.

## Access Control

Data export functionality is restricted to admin users only. The system performs the following checks:

1. User must be authenticated
2. User must have the 'admin' role
3. API endpoints enforce these restrictions server-side

## Available Export Options

### User Data Export

Export all user information:

```
GET /api/admin/export-users
```

Optional parameters:
- `format`: Specify the export format ('csv' or 'json', default is 'json')
- `role`: Filter users by role ('admin', 'doctor', 'patient')

Example:
```
/api/admin/export-users?format=csv&role=doctor
```

### Appointment Data Export

Export all appointment information:

```
GET /api/admin/export-appointments
```

Optional parameters:
- `format`: Specify the export format ('csv' or 'json', default is 'json')
- `status`: Filter appointments by status ('confirmed', 'pending', 'completed', 'cancelled')

Example:
```
/api/admin/export-appointments?format=csv&status=confirmed
```

### Export All Data

Export all system data at once:

```
GET /api/admin/export-all
```

Optional parameters:
- `format`: Specify the export format ('csv' or 'json', default is 'json')

Example:
```
/api/admin/export-all?format=json
```

## External Sharing Options

After data export, administrators can share the data through various channels:

1. **Direct Download**: CSV files for immediate download
2. **Email**: Share data via email
3. **WhatsApp**: Share data through WhatsApp
4. **Google Sheets**: Export data directly to Google Sheets

## Scheduled Exports

The system supports scheduled data exports that can be configured to run automatically:

1. Weekly User Report
2. Monthly Analytics

To set up a new scheduled export, visit the Admin Dashboard > Export Data > Set Up New Scheduled Export.

## Best Practices

1. Only export the data you need
2. Be mindful of sensitive information - exported data may contain personal information
3. Check data privacy regulations before sharing exports externally
4. Delete exported data when no longer needed
5. Use scheduled exports for regular reporting needs to maintain consistency

## Troubleshooting

If you encounter issues with data exports:

1. Verify you have admin permissions
2. Check your internet connection
3. Try a different export format
4. Contact system administrator if issues persist 