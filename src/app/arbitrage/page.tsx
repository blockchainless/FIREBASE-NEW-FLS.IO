import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ArbitragePage() {
  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in">
      <Card className="bg-black/50 backdrop-blur-sm border-2 border-primary shadow-neon-blue">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">DEMO</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Content will be provided later */}
        </CardContent>
      </Card>
    </div>
  );
}
