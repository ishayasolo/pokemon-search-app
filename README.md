# Pokémon Search App

A production-ready Pokémon search application built with Next.js 14+, TypeScript, and modern React patterns. This app demonstrates clean architecture, functional programming principles, and atomic design patterns.

## 🚀 Features

- **Real-time Pokémon Search**: Search for any Pokémon by name with debounced input
- **Detailed Stats Display**: View comprehensive Pokémon statistics with visual bars
- **Type System**: Color-coded type badges for easy identification
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Error Handling**: Graceful error states with user-friendly messages
- **Loading States**: Skeleton loading components for better UX
- **Modern Architecture**: Atomic design pattern with SOLID principles

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Architecture**: Atomic Design Pattern
- **API**: PokéAPI with custom middleware

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── pokemon/
│   │       ├── route.ts              # API route with HOF middleware
│   │       └── use-pokemon-search.ts # React Query hooks
│   ├── page.tsx                      # Main page
│   ├── layout.tsx                    # Root layout with providers
│   ├── globals.css                   # Global styles
│   └── favicon.ico                   # App favicon
├── components/
│   ├── atoms/                        # Basic building blocks
│   │   ├── type-badge.tsx
│   │   ├── stat-bar.tsx
│   │   └── index.ts
│   ├── molecules/                    # Simple component groups
│   │   ├── search-bar.tsx
│   │   ├── pokemon-card.tsx
│   │   └── index.ts
│   ├── organisms/                    # Complex component groups
│   │   ├── search-header.tsx
│   │   └── index.ts
│   ├── templates/                    # Page-level components
│   │   ├── search-page-template.tsx
│   │   └── index.ts
│   └── ui/                           # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── skeleton.tsx
│       └── index.ts
├── lib/
│   ├── hofs/                         # Higher-Order Functions
│   │   ├── with-error-handler.ts
│   │   ├── with-logger.ts
│   │   ├── with-base-url.ts
│   │   ├── with-middleware.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── transformers.ts            # Functional transformations
│   │   ├── cn.ts                     # Class name utility
│   │   └── index.ts
│   └── providers.tsx                 # React Query provider
└── types/
    └── index.ts                      # TypeScript definitions
```

## 🏗 Architecture Decisions

### Higher-Order Functions (HOFs)

The application uses several HOFs to enhance functionality and maintain clean separation of concerns:

#### 1. `withErrorHandler`

- **Purpose**: Transforms API errors into user-friendly messages
- **Benefits**: Centralized error handling, consistent user experience
- **Usage**: Wraps API calls to provide meaningful error messages

#### 2. `withLogger`

- **Purpose**: Logs requests and responses for debugging
- **Benefits**: Development debugging, performance monitoring
- **Usage**: Tracks API call duration and success/failure states

#### 3. `withBaseUrl`

- **Purpose**: Injects consistent API base URL
- **Benefits**: Environment flexibility, URL consistency
- **Usage**: Ensures all API calls use the correct base URL

#### 4. `withMiddleware`

- **Purpose**: Composes multiple HOFs together
- **Benefits**: Reusable middleware chains, clean composition
- **Usage**: Combines error handling, logging, and URL injection

### Data Transformation Strategy

The app uses functional programming principles with `map`, `filter`, and `reduce`:

```typescript
// Map: Transform data structure
const mappedData = {
  displayName:
    rawPokemon.name.charAt(0).toUpperCase() + rawPokemon.name.slice(1),
  types: rawPokemon.types.map(type => type.type.name),
  // ...
};

// Reduce: Calculate aggregated values
const totalStats = Object.values(mappedData.stats).reduce(
  (sum, stat) => sum + stat,
  0
);

// Filter: Remove unwanted data
const filteredPokemon = pokemon.filter(p =>
  p.types.includes(type.toLowerCase())
);
```

### State Management Approach

- **React Query**: Handles all server state with caching, background updates, and error handling
- **Local State**: React hooks for UI state (search input, loading states)
- **No Global State**: Avoids unnecessary complexity for this use case

### Design Pattern Rationale

#### Atomic Design Pattern

- **Atoms**: Reusable UI elements (TypeBadge, StatBar)
- **Molecules**: Simple component combinations (SearchBar, PokemonCard)
- **Organisms**: Complex UI sections (SearchHeader)
- **Templates**: Page-level layouts (SearchPageTemplate)

#### SOLID Principles

- **Single Responsibility**: Each component/function has one clear purpose
- **Open/Closed**: Components are extensible without modification
- **Dependency Inversion**: Components depend on abstractions (HOFs, interfaces)
- **DRY**: Reusable logic extracted into utilities and HOFs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pokemon-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

```bash
npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. The app uses PokéAPI's public endpoint.

### Customization

- **PokéAPI Base URL**: Modify `POKEAPI_BASE_URL` in `src/app/api/pokemon/route.ts`
- **Styling**: Update Tailwind classes or shadcn/ui components
- **HOFs**: Add new middleware functions in `/src/lib/hofs/`

## 📊 API Integration

The app uses a custom API route (`/api/pokemon`) located in `src/app/api/pokemon/route.ts` that:

1. **Proxies PokéAPI requests** with error handling
2. **Applies HOF middleware** for logging and error transformation
3. **Transforms data** using functional programming patterns
4. **Returns consistent responses** with proper TypeScript types

React Query hooks are located in `src/app/api/pokemon/use-pokemon-search.ts` for data fetching.

### Example API Response

```typescript
{
  data: {
    id: 25,
    name: "pikachu",
    displayName: "Pikachu",
    height: "0.4m",
    weight: "6kg",
    image: "https://...",
    types: ["electric"],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
      specialAttack: 50,
      specialDefense: 50
    },
    totalStats: 320
  },
  success: true
}
```

## 🎨 UI Components

### shadcn/ui Integration

The app uses shadcn/ui components for consistent design:

- **Button**: Interactive elements
- **Input**: Search input with icons
- **Card**: Pokémon information display
- **Badge**: Type indicators
- **Skeleton**: Loading states

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Flexible layouts**: Adapts to different screen sizes
- **Touch-friendly**: Appropriate touch targets and spacing

## 🧪 Testing

While not implemented in this version, the architecture supports easy testing:

- **HOFs**: Pure functions that can be unit tested
- **Transformers**: Functional utilities with predictable inputs/outputs
- **Components**: Isolated components with clear interfaces

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

The app is a standard Next.js application and can be deployed to:

- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [TanStack Query](https://tanstack.com/query) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

Built with ❤️ using modern React patterns and clean architecture principles.
