import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useInvestorRequest } from "@/hooks/use-api";
import { insertInvestorRequestSchema } from "@shared/schema";
import { Briefcase, Building, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { z } from "zod";

// We need to adapt the schema to handle the JSON stringified array for checkboxes
// This local schema helps us manage the form state as an actual array before sending
const formSchema = insertInvestorRequestSchema.extend({
  investorTypes: z.array(z.string()).optional(), // Override to handle array in UI
});

type FormValues = z.infer<typeof formSchema>;

export default function InvestorDeck() {
  const investorRequest = useInvestorRequest();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      firmName: "",
      role: "",
      investorTypes: [],
      checkSize: "",
      stageFocus: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // Convert array back to string if needed by schema, or backend handles it.
    // The shared schema expects 'text' for investorTypes, but our API might expect the stringified version.
    // Let's assume for this implementation we simply JSON.stringify it for the backend text field
    
    const payload = {
      ...data,
      investorTypes: JSON.stringify(data.investorTypes),
    };
    
    investorRequest.mutate(payload, {
      onSuccess: () => {
        // Optional: redirect or show persistent success state
        form.reset();
      }
    });
  };

  const investorTypes = ["VC", "Angel", "Family office", "Accelerator", "Strategic", "Other"];
  const checkSizes = ["<$50k", "$50k to $250k", "$250k to $1M", "$1M+"];
  const stages = ["Pre seed", "Seed", "Series A", "Other"];

  return (
    <Layout>
      <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">
              Request Investor Deck
            </h1>
            <p className="text-lg text-slate-600">
              Thank you for your interest in Talking Pills. Please share a few details to access our materials.
            </p>
          </div>

          <Card className="shadow-xl border-slate-200">
            <CardHeader className="bg-white border-b border-slate-100 pb-8 pt-8 px-8 lg:px-10">
              <CardTitle>Investor Information</CardTitle>
              <CardDescription>All fields marked with * are required</CardDescription>
            </CardHeader>
            <CardContent className="p-8 lg:p-10 bg-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Contact Details</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                              <Input className="pl-9" placeholder="jane@venture.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Professional Info */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Firm Details</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="firmName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Firm Name *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input className="pl-9" placeholder="Acme Ventures" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role / Title *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input className="pl-9" placeholder="Partner" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Investment Profile */}
                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Investment Profile (Optional)</h3>
                    
                    <FormField
                      control={form.control}
                      name="investorTypes"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Investor Type</FormLabel>
                            <FormDescription>
                              Select 2 to 4 that best describe you
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {investorTypes.map((item) => (
                              <FormField
                                key={item}
                                control={form.control}
                                name="investorTypes"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), item])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {item}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="checkSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Typical Check Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {checkSizes.map((size) => (
                                  <SelectItem key={size} value={size}>{size}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stageFocus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stage Focus</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {stages.map((stage) => (
                                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25 mt-8"
                    disabled={investorRequest.isPending}
                  >
                    {investorRequest.isPending ? "Submitting Request..." : "Request Access"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
