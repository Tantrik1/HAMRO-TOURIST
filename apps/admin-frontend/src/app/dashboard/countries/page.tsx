'use client';

import { ResourcePage } from '@/components/resource-page';

export default function CountriesPage() {
  return (
    <ResourcePage
      title="Countries"
      subtitle="The top of your geographic hierarchy. Add the countries your agency operates in."
      endpoint="/products/countries"
      primaryField="name"
      fields={[
        { name: 'name', label: 'Country name', required: true, placeholder: 'Nepal' },
        { name: 'code', label: 'ISO Code', required: true, placeholder: 'NP' },
      ]}
      emptyState="Add your first country to start organizing tours and treks."
      newButtonLabel="Add country"
      basePath="/dashboard/countries"
    />
  );
}
