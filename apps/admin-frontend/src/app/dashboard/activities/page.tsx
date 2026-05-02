'use client';

import { useEffect, useState } from 'react';
import { ResourcePage, ResourceField } from '@/components/resource-page';
import { apiGet } from '@/lib/api';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9-\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function ActivitiesPage() {
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    apiGet<any[]>('/products/regions').then((res) => {
      if (res.success) setRegions(res.data);
    });
  }, []);

  const fields: ResourceField[] = [
    { name: 'title', label: 'Activity name', required: true, placeholder: 'White-water rafting' },
    {
      name: 'regionId',
      label: 'Region',
      type: 'select',
      required: true,
      options: regions.map((r) => ({ value: r.id, label: r.name })),
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      options: [
        { value: 'adventure', label: 'Adventure' },
        { value: 'cultural', label: 'Cultural' },
        { value: 'wildlife', label: 'Wildlife' },
        { value: 'wellness', label: 'Wellness' },
        { value: 'food', label: 'Food & Dining' },
      ],
    },
    { name: 'basePrice', label: 'Base price (USD)', type: 'number', required: true, placeholder: '49' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ];

  return (
    <ResourcePage
      title="Activities"
      subtitle="Add-ons and standalone experiences your agency offers."
      endpoint="/products/activities"
      primaryField="title"
      secondaryField="description"
      fields={fields}
      emptyState="Activities can be linked to tours/treks or sold standalone."
      newButtonLabel="Add activity"
      beforeSubmit={(d) => ({ ...d, slug: slugify(d.title || '') })}
    />
  );
}
