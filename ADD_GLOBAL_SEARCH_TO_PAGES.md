# Adding Global Search to All Pages

## Quick Guide

To add the global search bar to any page, follow these steps:

### Step 1: Add CSS Link
Add this line in the `<head>` section after other CSS imports:
```html
<link rel="stylesheet" href="../styles/global-search.css">
```

### Step 2: Add Search HTML
Replace the existing search box or add this HTML in the topbar, between `topbar-left` and `topbar-right`:

```html
<!-- Global Search -->
<div class="global-search-container">
    <div class="global-search-wrapper">
        <i class='bx bx-search search-icon'></i>
        <input type="text" id="globalSearchInput" class="global-search-input" placeholder="Search submissions, feedback, groups..." autocomplete="off">
        <span class="search-shortcut">Ctrl+K</span>
    </div>
    <div id="globalSearchResults" class="global-search-results">
        <!-- Search results will appear here -->
    </div>
</div>
```

### Step 3: Add JavaScript
Add this script tag before the closing `</body>` tag:
```html
<script src="../utils/global-search.js"></script>
```

### Step 4: Update Topbar CSS (if needed)
If the topbar layout breaks, update the topbar styles:

```css
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}
```

## Features

### Keyboard Shortcut
- Press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac) to focus the search input from anywhere

### Search Capabilities
- Searches across:
  - Submissions
  - Feedback & Grades
  - Study Groups
  - Group Assignments
  - Messages (future)
  - Courses (future)

### Search Features
- Real-time search with 300ms debounce
- Relevance scoring
- Highlighted search terms
- Category grouping
- Click to navigate
- Keyboard navigation (Escape to close)

### Filters (Ready for Implementation)
- Course filter
- Status filter
- Date range filter
- Grade filter

## Pages to Update

- [x] Dashboard - ✅ DONE
- [ ] Upload
- [ ] Submissions
- [ ] Feedback
- [ ] Collaboration
- [ ] Calendar
- [ ] Analytics
- [ ] Chat/Messages
- [ ] Settings

## Customization

### Change Placeholder Text
```html
<input ... placeholder="Your custom text here">
```

### Change Keyboard Shortcut Display
```html
<span class="search-shortcut">⌘K</span> <!-- For Mac -->
<span class="search-shortcut">Ctrl+K</span> <!-- For Windows/Linux -->
```

### Hide Shortcut on Mobile
The shortcut badge automatically hides on mobile devices (< 768px)

## Testing

After adding to a page, test:
1. Click search input - should focus
2. Type 2+ characters - should show results
3. Press Ctrl+K - should focus search
4. Press Escape - should close results
5. Click outside - should close results
6. Click result - should navigate

## Troubleshooting

### Search not working
- Check if `global-search.js` is loaded
- Check browser console for errors
- Verify HTML IDs match (`globalSearchInput`, `globalSearchResults`)

### Results not showing
- Type at least 2 characters
- Check if results container has `active` class
- Verify CSS is loaded

### Keyboard shortcut not working
- Check if event listener is attached
- Verify no conflicts with other shortcuts
- Check browser console for errors

## Future Enhancements

- [ ] Advanced filters UI
- [ ] Search history
- [ ] Saved searches
- [ ] Search analytics
- [ ] Voice search
- [ ] Search suggestions
- [ ] Recent searches
- [ ] Popular searches
