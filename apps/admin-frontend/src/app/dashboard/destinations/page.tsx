'use client';

import { ResourcePage } from '@/components/resource-page';

export default function DestinationsPage() {
  return (
    <ResourcePage
      title="Destinations"
      subtitle="Specific places within regions — treks, peaks, attractions."
      endpoint="/products/treks"
      primaryField="title"
      secondaryField="description"
      fields={[
        { name: 'title', label: 'Destination name', required: true, placeholder: 'Everest Base Camp' },
        { name: 'regionId', label: 'Region', type: 'select', required: true },
        { name: 'difficulty', label: 'Difficulty', type: 'select', required: true },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Famous trek through the Khumbu region...' },
      ]}
      emptyState="Add regions first, then create destinations within them."
      newButtonLabel="Add destination"
      basePath="/dashboard/destinations"
    />
  );
}
