import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { AppProvider } from "@/context/AppContext";

import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-7xl text-gradient">
          404
        </h1>

        <p className="mt-3 text-muted-foreground">
          This page wandered off the runway.
        </p>

        <Link
          to="/"
          className="inline-flex mt-6 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  console.error(error);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
      <div>
        <h2 className="font-display text-2xl">
          This page didn't load
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end.
        </p>

        <div className="mt-5 flex gap-2 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-5 py-2 rounded-full bg-black text-white text-sm"
          >
            Try again
          </button>

          <Link
            to="/"
            className="px-5 py-2 rounded-full border text-sm"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route =
  createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()({
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "Lumora",
        },
      ],

      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    }),

    component: RootComponent,

    notFoundComponent: NotFoundComponent,

    errorComponent: ErrorComponent,
  });

function RootComponent() {
  const { queryClient } =
    Route.useRouteContext();

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />

              <main className="flex-1">
                <Outlet />
              </main>

              <Footer />
            </div>

            <Toaster
              position="top-right"
              richColors
              closeButton
            />
          </AppProvider>
        </QueryClientProvider>

        <Scripts />
      </body>
    </html>
  );
}