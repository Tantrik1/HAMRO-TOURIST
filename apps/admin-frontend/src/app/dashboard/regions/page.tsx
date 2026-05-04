'use client';

import { ResourcePage } from '@/components/resource-page';

export default function RegionsPage() {
  return (
    <ResourcePage
      title="Regions"
      subtitle="Group destinations within each country (e.g. Annapurna in Nepal)."
      endpoint="/products/regions"
      primaryField="name"
      secondaryField="description"
      fields={[
        { name: 'name', label: 'Region name', required: true, placeholder: 'Annapurna' },
        { name: 'countryId', label: 'Country', type: 'select', required: true },
        { name: 'description', label: 'Short description', type: 'textarea', placeholder: 'A trekking paradise in the Himalayas...' },
      ]}
      emptyState="Add countries first, then create regions within them."
      newButtonLabel="Add region"
      basePath="/dashboard/regions"
    />
  );
}
