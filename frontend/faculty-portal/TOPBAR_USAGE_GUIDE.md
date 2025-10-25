# Topbar Features - Usage Guide

## Quick Start

The profile menu and notification panel are automatically available on all faculty portal pages. No additional setup required!

## Profile Menu

### How to Access
Click on your profile picture/name in the top-right corner of any page.

### Available Options
1. **My Profile** - View and edit your profile (goes to Settings)
2. **Settings** - Access all settings and preferences
3. **My Analytics** - View your teaching analytics
4. **Logout** - Sign out of the portal

### Visual Indicators
- Hover effect: Light blue background
- Active state: Dropdown visible with smooth animation
- Logout option: Red text for emphasis

## Notification Panel

### How to Access
Click on the bell icon (🔔) in the top-right corner of any page.

### Badge Counter
- Shows number of unread notifications
- Red circle with white text
- Automatically updates when notifications are read
- Hides when count reaches 0

### Notification Types

#### 1. Submissions (Blue Icon)
- New student submissions
- Example: "John Doe submitted Assignment 3"

#### 2. Messages (Green Icon)
- New messages from students
- Example: "Sarah Smith sent you a message"

#### 3. Deadlines (Orange Icon)
- Upcoming assignment deadlines
- Example: "Assignment 2 deadline is tomorrow"

#### 4. Grading (Purple Icon)
- Grading-related updates
- Example: "You completed grading for Assignment 1"

#### 5. System (Light Blue Icon)
- System updates and announcements
- Example: "New features available in the portal"

### Actions

#### Mark Individual as Read
- Click on any notification
- Background changes from highlighted to normal
- Badge counter decreases by 1

#### Mark All as Read
- Click "Mark all as read" button at the top
- All notifications become read
- Badge counter resets to 0
- Success toast appears

#### View All Notifications
- Click "View All Notifications" at the bottom
- Navigates to Messages page

## Toast Notifications

Toast notifications appear automatically for various actions:

### Success (Green)
- Settings saved
- Profile updated
- Notifications marked as read

### Error (Red)
- Failed operations
- Validation errors
- Connection issues

### Warning (Orange)
- Important notices
- Rubric total warnings

### Info (Blue)
- General information
- System messages

### Behavior
- Appears bottom-right corner
- Auto-dismisses after 3 seconds
- Shows icon + message
- Smooth fade animation

## Keyboard Shortcuts (Future Enhancement)

Planned keyboard shortcuts:
- `Alt + N` - Open notifications
- `Alt + P` - Open profile menu
- `Esc` - Close open panels

## Tips & Tricks

1. **Quick Access**: Click anywhere outside the panels to close them
2. **One at a Time**: Opening one panel automatically closes the other
3. **Stay Updated**: Check the badge counter regularly for new notifications
4. **Mobile Friendly**: Panels adapt to smaller screens automatically
5. **No Reload Needed**: All interactions happen instantly without page refresh

## Troubleshooting

### Panel Not Opening?
- Ensure JavaScript is enabled
- Check browser console for errors
- Refresh the page

### Badge Not Updating?
- Click "Mark all as read" to reset
- Refresh the page to sync with server

### Styling Issues?
- Clear browser cache
- Ensure dashboard.css is loaded
- Check for CSS conflicts

## Browser Support

Fully supported on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Mobile Experience

### Phone (< 576px)
- Profile name hidden (icon only)
- Full-width notification panel
- Optimized touch targets
- Scrollable content

### Tablet (576px - 991px)
- Profile name visible
- Adjusted panel widths
- Touch-friendly interface

## Customization

### For Developers

To customize the notification content, edit `utils/topbar.js`:

```javascript
// Change notification items
const panel = document.createElement('div');
panel.innerHTML = `
  <div class="notification-item unread">
    <div class="notification-icon submission">
      <i class='bx bx-file'></i>
    </div>
    <div class="notification-content">
      <h4>Your Title</h4>
      <p>Your message</p>
      <span class="notification-time">Time</span>
    </div>
  </div>
`;
```

### Styling

To customize colors, edit `styles/dashboard.css`:

```css
/* Change notification colors */
.notification-icon.submission {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
}

/* Change badge color */
.badge {
    background: #ff4757;
}
```

## Future Enhancements

Planned features:
- Real-time notifications via WebSocket
- Notification preferences
- Sound alerts
- Desktop notifications
- Notification categories filter
- Search notifications
- Archive notifications
- Notification history

## Support

For issues or questions:
1. Check this guide first
2. Review the technical documentation
3. Contact the development team
4. Submit a bug report

---

**Last Updated**: October 25, 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
