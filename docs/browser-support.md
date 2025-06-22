# Browser Support

## Supported Browsers

### Family Recipe Book Website

- **Chrome** (latest version) - Full support including Hebrew RTL input
- **Safari** (latest version) - Full support except Hebrew RTL input
- **Firefox** (latest version) - Full support except Hebrew RTL input
- **Edge** (latest version) - Full support except Hebrew RTL input

### Recipe Builder Application

- **Chrome** (latest version) - Full support including Hebrew RTL input
- **Other browsers** - Not supported for Hebrew RTL input functionality

## Hebrew RTL Input Support

The Hebrew right-to-left (RTL) input functionality, particularly in the Recipe Builder application, is **only supported in the latest version of Chrome**. This includes:

- Hebrew text input fields
- RTL text direction handling
- Hebrew character validation
- Hebrew placeholder text and labels

## Why Chrome Only for Hebrew Input?

Hebrew RTL input requires specific browser capabilities and CSS features that are most reliably implemented in Chrome. Other browsers may have inconsistent or incomplete support for:

- CSS `direction: rtl` property
- Hebrew character input handling
- RTL text selection and cursor positioning
- Hebrew font rendering

## Recommendations

1. **For Recipe Creation**: Use Chrome when creating or editing recipes with Hebrew content
2. **For Recipe Viewing**: Any modern browser can view recipes, but Chrome provides the best Hebrew text experience
3. **For Development**: Test Hebrew functionality primarily in Chrome

## Future Considerations

- Monitor browser support for Hebrew RTL input in other browsers
- Consider implementing fallback solutions for non-Chrome browsers
- Evaluate Web Components or polyfills for broader browser support
