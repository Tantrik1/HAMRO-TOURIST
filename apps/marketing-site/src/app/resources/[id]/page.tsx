import React from 'react';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, BookOpen, Video, FileText, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Nav from '@/components/sections/nav';
import Footer from '@/components/sections/footer';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

const resources = [
  {
    id: 1,
    type: 'Guide',
    icon: BookOpen,
    color: '#F07420',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
    title: 'Why Your Travel Agency Needs Hamro Tourist',
    description: 'Discover the 5 critical reasons why modern travel agencies are switching to Hamro Tourist. From automated bookings to 24/7 customer capture.',
    readTime: '8 min read',
    category: 'Getting Started',
    content: `
# Why Your Travel Agency Needs Hamro Tourist

The travel industry is undergoing a massive transformation. Traditional agencies that rely on manual processes are falling behind, while tech-enabled agencies are capturing market share at an unprecedented rate.

## 1. Automated Bookings 24/7

While you sleep, your website should be capturing bookings. Hamro Tourist's automated booking system allows customers to book anytime, anywhere. No more missed opportunities because you're offline or busy.

## 2. Unified CRM for Complete Customer Visibility

Stop losing leads in WhatsApp chats, email threads, and spreadsheets. Our CRM gives you a single view of every customer interaction, from first inquiry to post-trip follow-up.

## 3. Beautiful Websites in Minutes

You don't need to be a developer or spend thousands on a custom website. Our AI-powered builder creates stunning, conversion-optimized websites in just 5 minutes.

## 4. Accept Payments from Anywhere

Connect Stripe, eSewa, Khalti, and custom payment gateways. Accept international payments and local favorites with equal ease.

## 5. Real-Time Analytics

Stop flying blind. Know exactly where your bookings come from, which marketing channels work, and where you're losing customers.

## The Cost of Waiting

Every day you delay adopting modern tools, competitors capture more of your market. The gap between tech-enabled and traditional agencies grows wider daily.

Start your transformation today with Hamro Tourist.
    `,
  },
  {
    id: 2,
    type: 'Video',
    icon: Video,
    color: '#3A4D8F',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80',
    title: 'Build Your Website in 5 Minutes',
    description: 'Watch our step-by-step tutorial on creating a stunning travel website using Hamro Tourist\'s AI builder. No coding required.',
    readTime: '5 min watch',
    category: 'Tutorial',
    content: `
# Build Your Website in 5 Minutes

In this tutorial, we'll show you how to create a professional travel website using Hamro Tourist's AI-powered website builder.

## Step 1: Choose Your Template

Select from our premium collection of travel-optimized templates. Each template is designed for high conversions and beautiful presentation of your tours.

## Step 2: Let AI Generate Your Content

Describe your travel agency, and our AI will generate compelling copy, stunning hero sections, and persuasive calls-to-action.

## Step 3: Customize with Drag-and-Drop

Easily customize colors, fonts, images, and layout with our intuitive drag-and-drop editor. No coding required.

## Step 4: Connect Your Domain

Connect your custom domain in seconds. We handle all the technical setup including SSL certificates.

## Step 5: Launch and Go Live

With one click, publish your website and start accepting bookings immediately.

## Why Hamro Tourist's Builder?

- **AI-Powered**: Generate professional content in seconds
- **Travel-Optimized**: Templates designed specifically for travel agencies
- **No Coding**: Drag-and-drop interface anyone can use
- **Mobile-Responsive**: Looks great on all devices
- **Fast Loading**: Optimized for performance and SEO

Start building your dream website today!
    `,
  },
  {
    id: 3,
    type: 'Case Study',
    icon: TrendingUp,
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    title: 'How to Triple Your Bookings in 90 Days',
    description: 'Real case study: How Himalayan Adventures used Hamro Tourist CRM to increase bookings by 300% in just 3 months.',
    readTime: '12 min read',
    category: 'Success Story',
    content: `
# How Himalayan Adventures Tripled Bookings in 90 Days

## The Challenge

Himalayan Adventures was a well-established trekking agency in Kathmandu. They had great guides and amazing tours, but they were struggling to scale. Manual booking processes, scattered customer data, and an outdated website were holding them back.

## The Solution

They implemented Hamro Tourist's complete platform:
1. New modern website with AI builder
2. Unified CRM for all customer interactions
3. Automated booking system
4. Real-time analytics dashboard

## The Results

- **300% increase in bookings** within 90 days
- **40% reduction in administrative time**
- **60% improvement in response time**
- **85% increase in repeat bookings**

## Key Success Factors

### 1. 24/7 Booking Capture
Their new website started capturing bookings while they slept. No more missed opportunities.

### 2. Automated Follow-Ups
The CRM automatically followed up with leads, increasing conversion rates significantly.

### 3. Data-Driven Decisions
Real-time analytics showed them which marketing channels worked best, allowing them to optimize their spend.

## What They Say

> "Hamro Tourist transformed our business. We went from struggling to scale to handling 3x the bookings without hiring more staff. The ROI was immediate." — Rajesh Sharma, Founder

## Your Turn

If Himalayan Adventures can achieve these results, so can you. Start your transformation today.
    `,
  },
  {
    id: 4,
    type: 'Guide',
    icon: FileText,
    color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    title: 'Complete CRM Setup Guide',
    description: 'Master the Hamro Tourist CRM. Learn to manage leads, automate follow-ups, and close more bookings with our comprehensive guide.',
    readTime: '15 min read',
    category: 'Advanced',
    content: `
# Complete CRM Setup Guide

## Getting Started with Hamro Tourist CRM

Your CRM is the heart of your travel agency. This guide will help you set it up for maximum efficiency and booking conversion.

## 1. Import Your Existing Leads

Don't start from scratch. Import your existing leads from spreadsheets, email lists, or other CRMs. We support CSV, Excel, and direct API connections.

## 2. Set Up Lead Scoring

Not all leads are equal. Configure lead scoring to prioritize hot leads who are ready to book. Focus your energy where it matters most.

## 3. Create Automated Workflows

Set up automated follow-up sequences:
- Welcome email for new leads
- Reminder for abandoned bookings
- Post-trip feedback requests
- Re-engagement campaigns for past customers

## 4. Customize Your Pipeline

Create custom pipeline stages that match your sales process:
- New Lead → Qualified → Proposal → Booked → Deposited → Paid → Completed

## 5. Enable Mobile Access

Your team is often in the field. Enable mobile access so they can update customer information on the go.

## Advanced Features

### Integration with Booking System
Automatically create CRM entries when bookings come through your website.

### WhatsApp Integration
Send automated WhatsApp messages for faster communication with local customers.

### Analytics Dashboard
Track conversion rates, pipeline velocity, and team performance.

## Best Practices

1. **Update CRM daily** — Keep data fresh for accurate insights
2. **Train your team** — Everyone should know how to use the CRM
3. **Regular reviews** — Weekly pipeline reviews to identify bottlenecks
4. **Automate ruthlessly** — Reduce manual data entry wherever possible

## Troubleshooting

### Leads Not Converting?
- Check your follow-up timing
- Review your lead scoring criteria
- Ensure your team is responding quickly

### Data Quality Issues?
- Set up validation rules
- Regular data audits
- Train team on proper entry

Master the CRM, master your business.
    `,
  },
  {
    id: 5,
    type: 'Video',
    icon: Video,
    color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    title: 'Payment Integrations Made Easy',
    description: 'Connect Stripe, eSewa, Khalti, and custom payment gateways in minutes. Accept payments from anywhere in the world.',
    readTime: '7 min watch',
    category: 'Tutorial',
    content: `
# Payment Integrations Made Easy

Accepting payments is critical for any travel agency. Hamro Tourist makes it simple to connect multiple payment gateways.

## Supported Gateways

### International
- **Stripe** — Global payments, 135+ currencies
- **PayPal** — Trusted worldwide
- **Square** — Simple setup

### Nepal Local
- **eSewa** — Most popular in Nepal
- **Khalti** — Digital wallet
- **IME Pay** — Mobile payments

### Custom
- Connect any custom gateway via our API

## Step-by-Step Setup

### 1. Navigate to Payment Settings
Go to Settings → Payment Gateways in your Hamro Tourist dashboard.

### 2. Choose Your Gateway
Select from our supported gateways or add a custom one.

### 3. Enter Your Credentials
- For Stripe: Enter your API keys
- For eSewa/Khalti: Enter your merchant credentials
- For custom: Follow our API documentation

### 4. Test the Integration
We provide a test mode to verify everything works before going live.

### 5. Go Live
Enable the gateway and start accepting payments.

## Best Practices

### Multiple Gateways
Offer multiple payment options to reduce friction. Customers prefer their familiar payment methods.

### Auto-Conversion
Automatically convert international payments to your local currency at competitive rates.

### Security
All payments are PCI-DSS compliant. We handle security so you don't have to.

### Refund Management
Process refunds directly from your dashboard. We handle the gateway communication.

## Troubleshooting

### Payment Failures?
- Check your gateway credentials
- Verify your account status with the provider
- Ensure your webhook URLs are correctly configured

### Currency Issues?
- Enable auto-conversion for international payments
- Check supported currencies for each gateway

Start accepting payments from anywhere in the world today!
    `,
  },
];

export default function ResourcePage({ params }: { params: { id: string } }) {
  const resource = resources.find(r => r.id === parseInt(params.id));

  if (!resource) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#090C14] text-foreground">
      <Nav />

      <main className="pt-8">
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/[0.06] mx-5 lg:mx-8">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090C14] via-transparent to-[#090C14]/50" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-5 lg:px-8 py-12">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold text-white" style={{ background: resource.color }}>
              {React.createElement(resource.icon, { size: 12 })}
              {resource.type}
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: resource.color }}>
              {resource.category}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[#8892A8]">
              <Clock size={10} />
              {resource.readTime}
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6" style={{ letterSpacing: '-0.03em' }}>
            {resource.title}
          </h1>

          {/* Description */}
          <p className="text-base text-[#8892A8] mb-12 leading-relaxed">
            {resource.description}
          </p>

          {/* Content */}
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:mb-5 prose-p:leading-8 prose-p:text-[#8892A8] prose-ul:my-6 prose-ul:space-y-3 prose-li:mb-0 prose-li:marker:text-[#F07420] prose-strong:text-foreground prose-strong:font-bold">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
              {resource.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <div className="rounded-2xl border border-white/[0.06] bg-[#161C2E] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground mb-2">Ready to Get Started?</h3>
              <p className="text-sm text-[#8892A8] mb-4">
                Join hundreds of travel agencies using Hamro Tourist to grow their business.
              </p>
              <a
                href="https://app.hamrotourist.com/auth?mode=signup"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F07420] text-white px-6 py-3 text-sm font-semibold hover:brightness-110 transition"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
