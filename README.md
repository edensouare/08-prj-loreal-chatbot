# Beauty Advisor

An independent product-discovery concept by Eden Souare, inspired by the L’Oréal Paris US site. Shoppers can ask about makeup, skin care, hair care, or hair fragrance and refine their answers in a conversation. See [design notes](DESIGN.md) for reference and image attribution.

## Preview

Open `index.html` with a local server or Codespaces Live Preview. The site uses plain HTML, CSS, and JavaScript. The configured Cloudflare Worker sends requests to OpenAI. A deployment only needs the public endpoint in `script.js`; the API key belongs in the Worker’s secret settings.

## Demo checks

1. Select **Skin care**, review the starter question, and send it.
2. Select a **Suggested question**. It should send immediately and preserve any draft in the field.
3. Ask a follow-up, such as “How would you simplify that for the evening?” Each reply should use the recent conversation.
4. Ask an unrelated question. The advisor should redirect you to beauty topics.
5. Choose **New chat** and confirm the conversation clears. On a phone, the consultation appears above the product feature.

To publish, push to GitHub and use **Settings → Pages → Deploy from a branch → main → /(root)**. Test the [public URL](https://edensouare.github.io/08-prj-loreal-chatbot/) in a private browser window.

## Scope

A conversation stores the last six successful exchanges in memory. The Worker receives the question and recent context. The prototype has no live inventory, pricing, or checkout. The official product page is the place to verify specific product details.
