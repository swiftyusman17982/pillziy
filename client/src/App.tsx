import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/Layout";      // ← your Layout component

import Home from "@/pages/Home";
import Mission from "@/pages/Mission";
import ContactUs from "@/pages/ContactUs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>  {/* ← Wrap Layout HERE — only once! */}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/mission" component={Mission} />
        <Route path="/contact-us" component={ContactUs} />
        <Route component={NotFound} />  {/* 404 page */}
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;