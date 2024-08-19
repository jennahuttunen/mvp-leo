# Hello! Welcome to my app!

Bolt Bookkeeper is essentially an expense tracking assistant. The idea for this app came from my friend who is a costume designer in the theatre business.

She needed to keep track of all the purchase receipts for the wardrobes of each show (musicals, plays, etc.) she's hired on, and she often works on several shows at a time.

Each show typically has dozens of characters with multiple costumes, all in different sizes and styles for each actor. It can easily add up to hundreds (or even thousands) of receipts!

## A Breakdown of the app structure

Since this is my first time building an app from scratch, you may find there are some ways in which the structure seems repetitive or even nonsensical. I totally own that, and I apologize in advance.

1. App.jsx has two main routes: Homepage and Purchases

2. Homepage is the first thing you see when you spin up the dev server. It contains 5 components:

   - Navbar: Navigates to different sections of the Homepage by mapping through an array of link objects
   - Hero: Just decoration, no interactive functionality
   - ProductionGrid: A grid of all the shows/productions a costume designer might be working on
   - AddProduction: A form where the user can enter a new show/production
   - Footer: Social media icon links for a professional look

3. The way to access the Purchases page is by clicking one of the "See Purchases" links in a production card in the ProductionGrid. This may seem strange (like, why not link the Purchases page in the navbar?) but it's because each Purchases page is unique to the Production to which it's attached. The Purchases Page contains 5 components:
   - Navbar: You'll notice the links are different on this page
   - PurchasesTitle: Not interactive, simply displays the title prop of the 'productions' piece of state whose purchases the user is viewing
   - AddPurchasesForm: Where the user inputs important info from the receipt. May throw errors for fringe cases. For example, it will not accept apostrophes in the 'vendor' input field (e.g., the user has to write "Macys" instead of "Macy's"). Don't get me started on the 'date' field.
   - PurchasesTable: This table is unique to whatever Production you clicked in the grid on Homepage.jsx. It contains a table of all the purchases that have been made **for that show only**.
   - Footer: just some nice social media icons to look professional.

<!-- Notes About Future Features -->

## TO DOS / NICE TO HAVES

Here are some features that I would like to add to this app in the future, but that I haven't have time to properly implement yet.

- Add functionality to the filter search bar
- Add modal warning to delete buttons
- Add icon to title in web browser tab
- Print label template
- Receipt scanner
- Reformat date in PurchasesTable (MM-DD-YYYY instead of YYY-MM-DD)

Free icons: https://undraw.co/illustrations
Color palette generator: https://coolors.co/582707-972d07-ff4b3e-ffb20f-ffe548

receipt parsers:
https://www.edenai.co/feature/ocr-receipt-parsing-apis?referral=top-free-receipt-parser-apis-and-open-source-models
https://github.com/ReceiptManager/receipt-parser-legacy
https://github.com/bhimrazy/receipt-ocr
