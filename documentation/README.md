# DivyaKala — Sacred Heritage & Artisanal Pooja Emporium

## 1. Project Overview
**DivyaKala** is a luxury, devotional, multi-page e-commerce website crafted for an authentic Indian Pooja Items & Religious Store. It blends traditional Vedic aesthetics (`#FFF9EF` Warm Ivory, `#C69B45` Temple Gold, `#702B32` Deep Maroon, `#E99A36` Saffron, `#E8D8BF` Sandalwood Beige, `#49362A` Deep Brown) with modern editorial layouts, full Dark Mode, complete RTL support, and interactive shopping workflows.

## 2. Directory Structure
```text
├── index.html                      # Home 1 — Heritage Emporium (Exactly 7 Sections)
├── assets/
│   ├── css/
│   │   └── styles.css              # Master stylesheet, CSS variables, Dark Mode, RTL & animations
│   ├── fonts/
│   │   └── fonts.css               # Cormorant Garamond & Plus Jakarta Sans typography system
│   ├── images/                     # 99 unique, topic-specific real photos + SVG brand logo & favicon
│   └── js/
│       └── main.js                 # Theme/RTL persistence, Cart, Wishlist, Search, Quick View, Filters, Auth & Forms
├── pages/
│   ├── home-2.html                 # Home 2 — Cinematic Spiritual Edition (Exactly 7 Sections)
│   ├── about.html                  # About — Sacred Lineage & Artisanal Guilds (Exactly 5 Sections)
│   ├── products.html               # Complete Product Catalog with Filtering, Search & Sorting (Exactly 5 Sections)
│   ├── festival-calendar.html      # Vedic Festival Calendar & Ritual Essentials (Exactly 5 Sections)
│   ├── contact.html                # Pooja Concierge, Validated Enquiry Form, Map & FAQ (Exactly 5 Sections)
│   ├── login.html                  # Patron Sign In with Password Toggle & Form Validation
│   ├── signup.html                 # Patron Registration with Welcome Code & Form Validation
│   ├── 404.html                    # Functional 404 Utility Page
│   └── coming-soon.html            # Functional Coming Soon Countdown Utility Page
└── documentation/
    └── README.md                   # Architecture & Quality Assurance Documentation
```

## 3. Section Count & Uniqueness Verification
- **Home 1 (`index.html`)**: 7 `<section>` blocks inside `<main>` (Hero, 8 Categories, Festival Essentials, Featured Bestsellers, Sacred Collections, Why Choose Us, Testimonials & Newsletter).
- **Home 2 (`pages/home-2.html`)**: 7 `<section>` blocks inside `<main>` (Cinematic Hero, Explore Sacred Essentials, Shop by Deity [6 Deities], Traditional Craftsmanship, Festival Special Collection, Spiritual Inspiration, Brand Story & Final CTA).
- **About (`pages/about.html`)**: 5 `<section>` blocks inside `<main>`:
  1. *Sacred Lineage & Living Heritage Hero* (Grand symmetrical sanctuary hero model with 3-panel editorial gallery showcasing Swamimalai foundry craft, consecrated temple deepams, and shastra botanicals, backed by a 4-pillar foundation vow ribbon).
  2. *Chronicle of Sacred Milestones (1984–2026)* (Alternating heritage timeline across Varanasi, Swamimalai, Mysuru & Haridwar).
  3. *The Pancha-Shuddhi Purity Standard & Metallurgy Charter* (Virgin Pitambari brass, Tamra copper, Kansa bell-metal & X-ray mukhi certificates).
  4. *Guardians of the DivyaKala Sampradaya* (Council of master Sthapatis, ritual scholars, and floral incense curators).
  5. *Dharma Seva Impact & Final CTA* (Rural temple illumination, artisan apprentice fellowships, and floral waste diversion).
- **Products (`pages/products.html`)**: 5 `<section>` blocks inside `<main>` (Hero, Categories & Filter/Sort Navigation, 12-Item Complete Catalog, Featured Collections & Special Offers, Shopping Benefits & CTA).
- **Festival Calendar (`pages/festival-calendar.html`)**: 5 `<section>` blocks inside `<main>` (Hero, Upcoming Festival Calendar, Festival-Wise Pooja Essentials, Festival Traditions & Celebrations, Shop Festival Collections CTA).
- **Contact (`pages/contact.html`)**: 5 `<section>` blocks inside `<main>` (Hero, Contact Information, Send an Enquiry, Store Location & Map, FAQ & Final CTA).
- **Login (`pages/login.html`)**: Validated patron login with password visibility toggle, active session persistence, and error feedback.
- **Sign Up (`pages/signup.html`)**: Validated patron registration with welcome coupon (`SHUBH10`), password confirmation check, and terms validation.
- **Primary Header CTA**: Prominent `Sign Up` button integrated into the desktop sticky header and mobile navigation drawer across every single page.
- **Mobile, Tablet & 1024px Hamburger Navigation**: Dedicated high-contrast hamburger button (`#dk-mobile-menu-btn`) active across 1024px, tablet (768px–1023px), and mobile (< 768px). The full header utility icon strip (`[Search] [Wishlist (0)] [Cart (0)] [Theme] [RTL] [Sign Up]`) is aligned inside the top of the hamburger drawer, accompanied by direct in-page drawer link closing.
- **Tablet / Tab-View 2+1 Grid Alignment**: In tab view (768px–1279px, including iPad portrait & landscape), 3-card showcases (such as Customer Testimonials on Home 1, Traditional Craftsmanship on Home 2, and Spiritual Inspiration on Home 2) feature an aligned 2-column layout in the first row with the 3rd card centered beneath them (`md:col-span-2 md:max-w-[calc(50%-gap)] md:mx-auto xl:col-span-1`).
- **Original Social Icons & Brand Hover Effects**: Replaced empty icon placeholders with authentic official vector SVGs for Instagram, YouTube, Facebook, WhatsApp, and Email Concierge across all page footers. Features authentic brand hover glows (Instagram sunset gradient, YouTube crimson, Facebook royal blue, WhatsApp emerald, and Email temple gold) with 3D scale-lift transitions.
- **Back-to-Top Button Pinned to Right Corner**: Realigned the Back to Top button (`#dk-back-to-top`) from the left to the bottom-right corner (`fixed bottom-6 right-6 sm:bottom-8 sm:right-8`) with gold border, maroon fill, smooth scroll-to-top, and 3D hover glow.
- **Zero Image Repetition**: Verified 101 unique content images across all pages with zero duplicates. Only `logo-divyakala.svg` and `favicon.svg` are shared as mandated by branding rules.
