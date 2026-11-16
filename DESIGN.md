# Beauty Advisor design reference

The [L’Oréal Paris US homepage](https://www.lorealparisusa.com/) was reviewed in a desktop capture on November 16, 2026. Its white wordmark, spaced category navigation, bold sans-serif campaign headlines, black rectangular buttons, and red RevitaLift product feature informed this concept. The site uses Campton with an Arial fallback. The official site already offers its own Beauty Genius service.

| Element | Reference | Beauty Advisor |
| --- | --- | --- |
| Color | Black and white interface with campaign-specific red photography | Warm off-white canvas, near-black controls, burgundy product panel and tinted assistant replies |
| Typography | Campton and uppercase campaign headlines | DM Sans for the interface and Playfair Display for an editorial headline |
| Layout | Product-led campaign imagery next to direct actions | On desktop, a product feature beside the consultation. On phones, the consultation comes before the feature |
| Actions | Rectangular controls and product links | Rectangular topic buttons for editable prompts, suggested questions that send on selection, and a link to confirm details on the official product page |

The product packshot comes from the [RevitaLift Triple Power product page](https://www.lorealparisusa.com/skin-care/facial-moisturizers/revitalift-triple-power-anti-aging-moisturizer). The repo supplied the L’Oréal wordmark. The composition, colors and typography are interpretations of the reference rather than a reproduction of the official site.

The consultation helps shoppers compare products and refine routines through conversation. The interface identifies the independent design, labels its answers as AI-generated, and gives shoppers a route to official product information. The prototype sends a limited conversation history to the existing Cloudflare Worker. It has no live product catalog or commerce integration.
