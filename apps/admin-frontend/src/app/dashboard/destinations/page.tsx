'use client';

import { useEffect, useState } from 'react';
import { ResourcePage, ResourceField } from '@/components/resource-page';
import { apiGet } from '@/lib/api';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9-\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function DestinationsPage() {
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    apiGet<any[]>('/products/regions').then((res) => {
      if (res.success) setRegions(res.data);
    });
  }, []);

  const fields: ResourceField[] = [
    { name: 'title', label: 'Destination name', required: true, placeholder: 'Everest Base Camp' },
    {
      name: 'regionId',
      label: 'Region',
      type: 'select',
      required: true,
      options: regions.map((r) => ({ value: r.id, label: r.name })),
    },
    {
      name: 'difficulty',
      label: 'Difficulty',
      type: 'select',
      required: true,
      options: [
        { value: 'easy', label: 'Easy' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'hard', label: 'Hard' },
        { value: 'extreme', label: 'Extreme' },
      ],
    },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Famous trek through the Khumbu region...' },
  ];

  return (
    <ResourcePage
      title="Destinations"
      subtitle="Specific places within regions — treks, peaks, attractions."
      endpoint="/products/treks"
      primaryField="title"
      secondaryField="description"
      fields={fields}
      emptyState="Add regions first, then create destinations within them."
      newButtonLabel="Add destination"
      beforeSubmit={(d) => ({ ...d, slug: slugify(d.title || '') })}
    />
  );
}
