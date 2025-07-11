import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler, Info } from "lucide-react";

export function SizeGuide() {
  const sizeChart = [
    { size: "XS", bust: "32-34", waist: "24-26", hips: "34-36" },
    { size: "S", bust: "34-36", waist: "26-28", hips: "36-38" },
    { size: "M", bust: "36-38", waist: "28-30", hips: "38-40" },
    { size: "L", bust: "38-40", waist: "30-32", hips: "40-42" },
    { size: "XL", bust: "40-42", waist: "32-34", hips: "42-44" },
  ];

  const measurementTips = [
    {
      step: 1,
      title: "Bust Measurement",
      description: "Measure around the fullest part of your bust while wearing a well-fitted bra.",
    },
    {
      step: 2,
      title: "Waist Measurement",
      description: "Measure around your natural waistline, which is the narrowest part of your torso.",
    },
    {
      step: 3,
      title: "Hip Measurement",
      description: "Measure around the fullest part of your hips, approximately 8 inches below your waist.",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Ruler className="w-4 h-4 mr-2" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">Size Guide</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Size Chart */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-6 text-center">Women's Size Chart</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-3 px-2 font-semibold">Size</th>
                    <th className="text-center py-3 px-2 font-semibold">Bust (inches)</th>
                    <th className="text-center py-3 px-2 font-semibold">Waist (inches)</th>
                    <th className="text-center py-3 px-2 font-semibold">Hips (inches)</th>
                  </tr>
                </thead>
                <tbody className="text-stone">
                  {sizeChart.map((item) => (
                    <tr key={item.size} className="border-b border-gray-200">
                      <td className="py-3 px-2 font-medium">{item.size}</td>
                      <td className="text-center py-3 px-2">{item.bust}</td>
                      <td className="text-center py-3 px-2">{item.waist}</td>
                      <td className="text-center py-3 px-2">{item.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Guide */}
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Size measurement guide diagram" 
              className="w-full rounded-xl mb-6"
            />
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-4">How to Measure</h4>
              {measurementTips.map((tip) => (
                <div key={tip.step} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {tip.step}
                  </div>
                  <div>
                    <h5 className="font-semibold text-charcoal">{tip.title}</h5>
                    <p className="text-sm text-stone">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-sage/10 rounded-lg">
              <p className="text-sm text-charcoal flex items-start">
                <Info className="w-4 h-4 text-sage mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Tip:</strong> For the most accurate measurements, ask someone to help you measure. 
                  Keep the measuring tape level and snug but not tight.
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
