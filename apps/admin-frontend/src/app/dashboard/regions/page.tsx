'use client';

import { useEffect, useState } from 'react';
import { ResourcePage, ResourceField } from '@/components/resource-page';
import { apiGet } from '@/lib/api';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9-\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function RegionsPage() {
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    apiGet<any[]>('/products/countries').then((res) => {
      if (res.success) setCountries(res.data);
    });
  }, []);

  const fields: ResourceField[] = [
    { name: 'name', label: 'Region name', required: true, placeholder: 'Annapurna' },
    {
      name: 'countryId',
      label: 'Country',
      type: 'select',
      required: true,
      options: countries.map((c) => ({ value: c.id, label: c.name })),
    },
    { name: 'description', label: 'Short description', type: 'textarea', placeholder: 'A trekking paradise in the Himalayas...' },
  ];

  return (
    <ResourcePage
      title="Regions"
      subtitle="Group destinations within each country (e.g. Annapurna in Nepal)."
      endpoint="/products/regions"
      primaryField="name"
      secondaryField="description"
      fields={fields}
      emptyState="Add countries first, then create regions within them."
      newButtonLabel="Add region"
      beforeSubmit={(d) => ({ ...d, slug: slugify(d.name || '') })}
    />
  );
}
