'use client';

import { ResourcePage } from '@/components/resource-page';

export default function ActivitiesPage() {
  return (
    <ResourcePage
      title="Activities"
      subtitle="Add-ons and standalone experiences your agency offers."
      endpoint="/products/activities"
      primaryField="title"
      secondaryField="description"
      fields={[
        { name: 'title', label: 'Activity name', required: true, placeholder: 'White-water rafting' },
        { name: 'regionId', label: 'Region', type: 'select', required: true },
        { name: 'type', label: 'Type', type: 'select', required: true },
        { name: 'basePrice', label: 'Base price (USD)', type: 'number', required: true, placeholder: '49' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
      emptyState="Activities can be linked to tours/treks or sold standalone."
      newButtonLabel="Add activity"
      basePath="/dashboard/activities"
    />
  );
}
