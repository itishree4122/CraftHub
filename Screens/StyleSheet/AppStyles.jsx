import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color palette
const Colors = {
  primary: '#a0522d',      // Sienna brown - main brand color
  primaryLight: '#FAECE0', // Light beige - backgrounds
  secondary: '#7F3F23',    // Dark brown - accents
  accent: '#C27D5E',       // Light brown - secondary elements
  success: '#388e3c',      // Green - success states
  error: '#d32f2f',        // Red - errors
  textDark: '#333',
  textMedium: '#666',
  textLight: '#888',
  white: '#fff',
  black: '#000',
  border: '#e0e0e0',
  background: '#f0f0f0',
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  transparent: 'transparent',
};

// Spacing
const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Border radius
const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  circle: 100,
};

// Shadows
const Shadows = {
  light: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  strong: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
};

// Typography
const Typography = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  body: {
    fontSize: 16,
    color: Colors.textDark,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: Colors.textDark,
    lineHeight: 20,
  },
  caption: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  captionSmall: {
    fontSize: 12,
    color: Colors.textLight,
  },
};

const AppStyles = StyleSheet.create({
  // ===== LAYOUT STYLES =====
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  
  // ===== HEADER STYLES =====
  headerContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.medium,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  addressText: {
    marginLeft: Spacing.sm,
    fontSize: 14,
    color: Colors.textDark,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    height: 48,
  },
  searchIcon: {
    marginRight: Spacing.sm,
    color: Colors.textMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  
  // ===== NAVIGATION STYLES =====
  navContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: Colors.primaryLight,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.sm,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: Spacing.xs,
    textAlign: 'center',
    color: Colors.textMedium,
  },
  activeTab: {
    color: Colors.primary,
  },
  
  // ===== TYPOGRAPHY =====
  heading1: {
    ...Typography.h1,
    marginBottom: Spacing.md,
  },
  heading2: {
    ...Typography.h2,
    marginBottom: Spacing.md,
  },
  heading3: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
  },
  body: {
    ...Typography.body,
    marginBottom: Spacing.sm,
  },
  bodySmall: {
    ...Typography.bodySmall,
    marginBottom: Spacing.sm,
  },
  caption: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  captionSmall: {
    ...Typography.captionSmall,
    marginBottom: Spacing.xs,
  },
  
  // ===== BUTTON STYLES =====
  button: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonDisabled: {
    backgroundColor: Colors.textLight,
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextPrimary: {
    color: Colors.white,
  },
  buttonTextSecondary: {
    color: Colors.primary,
  },
  
  // ===== CARD STYLES =====
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.light,
  },
  cardHighlight: {
    backgroundColor: Colors.primaryLight,
    ...Shadows.light,
  },
  
  // ===== PRODUCT CARD STYLES =====
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.light,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    color: Colors.textDark,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  
  // ===== SLIDESHOW STYLES =====
  slideshowContainer: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.background,
  },
  slide: {
    width: width - Spacing.md * 2, // Account for padding
    height: 200,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  slideTitle: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: Spacing.xs,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.overlayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    left: Spacing.sm,
  },
  rightArrow: {
    right: Spacing.sm,
  },
  arrowText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },

  // ===== SECTION STYLES =====
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitleWithArrow: {
    ...Typography.h2,
    color: Colors.textDark,
  },
  arrowIcon: {
    padding: Spacing.sm,
  },

  sectionContainer: {
    marginBottom: Spacing.lg,
  },
  horizontalScroll: {
    paddingVertical: Spacing.sm,
  },
  handicraftCard: {
    width: 150,
    marginRight: Spacing.md,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    ...Shadows.light,
  },
  handicraftImage: {
    width: '100%',
    height: 120,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  handicraftTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    color: Colors.textDark,
  },
  handicraftPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },

  // ===== ARTISAN STORIES =====
  artisanStoriesContainer: {
    marginTop: Spacing.sm,
  },
  artisanCard: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  artisanHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  artisanImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: Spacing.sm,
  },
  artisanInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  artisanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  artisanCraft: {
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  artisanLocation: {
    fontSize: 12,
    color: Colors.textMedium,
    marginBottom: Spacing.xs,
  },
  artisanYears: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  artisanStory: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textMedium,
    fontStyle: 'italic',
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    paddingLeft: Spacing.sm,
  },

  // ===== FEATURED PRODUCTS =====
  featuredProductCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  featuredProductImage: {
    width: '100%',
    height: 200,
  },
  featuredProductOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.overlay,
    padding: Spacing.sm,
  },
  featuredProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  featuredProductPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  horizontalProductCard: {
    width: 150,
    height: 180,
    marginRight: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.light,
  },
  horizontalProductImage: {
    width: '100%',
    height: '100%',
  },
  horizontalProductOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.overlay,
    padding: Spacing.sm,
  },
  horizontalProductTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  horizontalProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },

  // ===== PROFILE PAGE STYLES =====
  profileHeader: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  profileHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  profileContent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  circularLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.md,
  },
  SignUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  sectionTitle: { 
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.md,
  },
  ordersReturnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  orderReturnCard: {
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    width: '48%',
    ...Shadows.light,
  },
  orderReturnText: {
    marginTop: Spacing.sm,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  accountSection: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
    marginLeft: Spacing.md,
  },

  // ===== LOGIN/SIGNUP PAGE STYLES =====
  signupButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  signupButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.sm,
    color: Colors.textMedium,
    fontWeight: '600',
  },

  // ===== LOGIN/SIGNUP PAGE STYLES =====
  loginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: Spacing.sm,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  placeholder: {
    width: 40, // Same as back button for balanced spacing
  },
  loginContent: {
    flex: 1,
    padding: Spacing.md,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    padding: Spacing.xs,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    ...Shadows.light,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
  },
  activeTabButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  tabButtonHorizontal: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.xs,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButtonHorizontal: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 3,
  },
  tabButtonTextHorizontal: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textMedium,
  },
  activeTabButtonTextHorizontal: {
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // ===== FORM STYLES =====
  formContainer: {
    marginBottom: Spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textDark,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    fontSize: 16,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },

  // ===== LOGINFORM STYLES =====
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    fontSize: 16,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  otpMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.md,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  radioChecked: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.textDark,
  },
  radioLabel: {
    fontSize: 14,
    color: Colors.textDark,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  otpInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    fontSize: 16,
    backgroundColor: Colors.white,
    marginRight: Spacing.sm,
  },
  getOtpButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  getOtpText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: Spacing.sm,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textDark,
  },
  optionIcon: {
    marginLeft: Spacing.xs,
  },

  // ===== TERMS AND CONDITIONS STYLES =====
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    fontSize: 14,
    color: Colors.textDark,
    flex: 1,
    flexWrap: 'wrap',
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: Colors.textLight,
    opacity: 0.7,
  },

  // ===== CALENDAR STYLES =====
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  calendarWeekdays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.sm,
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calendarDay: {
    width: '14.28%', // 7 days in a week
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.xs,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  empty: {
    backgroundColor: Colors.transparent,
  },

  // ===== PRODUCT DETAIL PAGE STYLES =====
  productImageContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Spacing.md,
  },
  productMainImage: {
    width: width,
    height: width,
  },
  productThumbnailContainer: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  productThumbnail: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.transparent,
  },
  productSelectedThumbnail: {
    borderColor: Colors.primary,
  },
  productThumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.sm,
  },
  productDetailsContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  productRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  productRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
  },
  productRatingText: {
    fontSize: 12,
    color: Colors.white,
    marginRight: Spacing.xs,
    fontWeight: 'bold',
  },
  productReviewText: {
    fontSize: 14,
    color: Colors.textMedium,
    marginRight: Spacing.sm,
  },
  productSoldText: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.lg,
  },
  productSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  productDescription: {
    fontSize: 16,
    color: Colors.textMedium,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  productArtisanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  productArtisanImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.sm,
  },
  productArtisanInfo: {
    flex: 1,
  },
  productArtisanName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  productArtisanLocation: {
    fontSize: 14,
    color: Colors.textMedium,
    marginBottom: Spacing.xs,
  },
  productArtisanYears: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  productQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  productQuantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  productQuantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: Spacing.md,
    minWidth: 30,
    textAlign: 'center',
  },
  productFooter: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  productCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  productCartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
  productBuyButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  productBuyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  authenticityBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 15,
  },
  authenticityText: {
    color: Colors.white,
    fontSize: 12,
    marginLeft: Spacing.xs,
    fontWeight: '500',
  },
  
  // ===== PRODUCT OPTIONS =====
  productOptionsContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  sizeOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
  },
  selectedSizeOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  sizeOptionText: {
    fontSize: 14,
    color: Colors.textDark,
  },
  selectedSizeOptionText: {
    color: Colors.white,
  },
  
  // ===== ARTISAN STORY =====
  productArtisanStory: {
    fontSize: 14,
    color: Colors.textMedium,
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
  viewProfileText: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  
  // ===== ZOOM MODAL =====
  zoomModalContainer: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomModalCloseButton: {
    position: 'absolute',
    top: Spacing.xl,
    right: Spacing.lg,
    zIndex: 1,
  },
  zoomedImage: {
    width: width,
    height: height * 0.7,
  },

  // ===== CART PAGE STYLES =====
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: Colors.textMedium,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  continueShoppingButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  continueShoppingText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  cartItemsContainer: {
    padding: Spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    ...Shadows.medium,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textMedium,
    marginLeft: Spacing.xs,
    marginRight: Spacing.sm,
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  artisanText: {
    fontSize: 12,
    color: Colors.accent,
    marginBottom: Spacing.sm,
    fontStyle: 'italic',
  },
  cartItemOption: {
    fontSize: 12,
    color: Colors.textMedium,
    marginBottom: Spacing.xs,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  cartItemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: Spacing.xs,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.light,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: Spacing.sm,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: Spacing.sm,
  },
  priceSummary: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.textMedium,
  },
  priceValue: {
    fontSize: 16,
    color: Colors.textDark,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  cartFooter: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ===== CHECKOUT PAGE STYLES =====
  checkoutItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    padding: Spacing.sm,
    ...Shadows.light,
  },
  checkoutItemImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
  },
  checkoutItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  checkoutItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  checkoutItemPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  paymentOptionSelected: {
    backgroundColor: '#f0f8ff',
  },
  paymentOptionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
    marginLeft: Spacing.md,
  },
  
  // ===== MY ORDERS PAGE STYLES =====
  ordersContainer: {
    padding: Spacing.md,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    ...Shadows.medium,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLight,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  orderItemImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
  },
  orderItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  orderItemArtisan: {
    fontSize: 14,
    color: Colors.accent,
    marginBottom: Spacing.xs,
    fontStyle: 'italic',
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.primaryLight,
    paddingTop: Spacing.md,
    marginTop: Spacing.sm,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
    textAlign: 'right',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  successCircle: {
  width: 80,
  height: 80,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
},
deliveryInfo: {
  backgroundColor: '#f8f9fa',
  padding: 16,
  borderRadius: 8,
},
deliveryInfoText: {
  color: '#666',
  marginBottom: 8,
  lineHeight: 20,
},
paymentInfo: {
  backgroundColor: '#f8f9fa',
  padding: 16,
  borderRadius: 8,
},
paymentInfoText: {
  color: '#666',
  marginBottom: 8,
  lineHeight: 20,
},
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  // ===== RETURNS PAGE STYLES =====
  returnsContainer: {
    padding: Spacing.md,
  },
  returnCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    ...Shadows.medium,
  },
  returnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLight,
  },
  returnId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  returnOrderId: {
    fontSize: 14,
    color: Colors.textMedium,
    marginBottom: Spacing.xs,
  },
  returnDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  returnStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
  },
  returnStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  returnItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  returnItemImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
  },
  returnItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  returnItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  returnItemArtisan: {
    fontSize: 14,
    color: Colors.accent,
    marginBottom: Spacing.xs,
    fontStyle: 'italic',
  },
  returnItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  returnDetails: {
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.textDark,
    flex: 1,
    marginLeft: Spacing.sm,
    textAlign: 'right',
  },
  refundAmount: {
    fontWeight: 'bold',
    color: Colors.success,
  },
  returnActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },

  // ===== ARTISAN PROFILE STYLES =====
  artisanStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  techniqueTag: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  techniqueText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  awardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    backgroundColor: '#fffaf0',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  
  // ===== ARTISAN BLOG PAGE STYLES =====
  artisanBlogContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  artisanBlogContent: {
    flex: 1,
    padding: Spacing.md,
  },
  artisanProfileHeader: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  artisanProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  artisanProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Spacing.md,
  },
  artisanProfileDetails: {
    flex: 1,
  },
  artisanProfileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  artisanProfileCraft: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  artisanProfileLocation: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  artisanStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.background,
    paddingTop: Spacing.md,
  },
  artisanStat: {
    alignItems: 'center',
  },
  artisanStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  artisanStatLabel: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  contentTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    padding: Spacing.xs,
  },
  contentTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  activeContentTab: {
    backgroundColor: Colors.white,
    ...Shadows.light,
  },
  contentTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textMedium,
  },
  activeContentTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  blogPostCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  blogPostImage: {
    width: '100%',
    height: 200,
  },
  blogPostContent: {
    padding: Spacing.md,
  },
  blogPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  blogPostDate: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },
  blogPostExcerpt: {
    fontSize: 14,
    color: Colors.textMedium,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  blogPostReadMore: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  videoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    padding: Spacing.md,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  videoDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  productShowcaseCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    ...Shadows.medium,
  },
  showcaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  showcaseImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  showcaseDescription: {
    fontSize: 14,
    color: Colors.textMedium,
    lineHeight: 20,
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyContentText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  
  // ===== ARTISAN BLOG PAGE ADDITIONAL STYLES =====
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  suggestionsList: {
    paddingHorizontal: Spacing.sm,
  },
  videosList: {
    paddingHorizontal: Spacing.sm,
  },
  artisanSuggestionCard: {
    width: 140,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    ...Shadows.medium,
  },
  artisanSuggestionHeader: {
    alignItems: 'center',
  },
  artisanSuggestionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: Spacing.sm,
  },
  artisanSuggestionInfo: {
    alignItems: 'center',
  },
  artisanSuggestionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  artisanSuggestionCraft: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  artisanSuggestionLocation: {
    fontSize: 11,
    color: Colors.textMedium,
    textAlign: 'center',
  },
  
  // ===== SHORT VIDEOS STYLES =====
  shortVideoCard: {
    width: 160,
    marginRight: Spacing.sm,
  },
  videoThumbnailContainer: {
    position: 'relative',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  shortVideoThumbnail: {
    width: 160,
    height: 240,
    borderRadius: BorderRadius.lg,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
    padding: Spacing.sm,
  },
  playIconContainer: {
    alignSelf: 'center',
    marginTop: 80,
  },
  videoDuration: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  videoInfo: {
    paddingHorizontal: Spacing.xs,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  videoViews: {
    fontSize: 12,
    color: Colors.textMedium,
  },
  contentCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
  },
  contentArtisanImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Spacing.sm,
  },
  contentArtisanInfo: {
    flex: 1,
  },
  contentArtisanName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
  },
  contentArtisanCraft: {
    fontSize: 12,
    color: Colors.textMedium,
  },
  contentImage: {
    width: '100%',
    height: width,
  },
  videoContainer: {
    position: 'relative',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  captionPreview: {
    padding: Spacing.sm,
  },
  captionText: {
    fontSize: 14,
    color: Colors.textDark,
    lineHeight: 18,
  },
  captionName: {
    fontWeight: '600',
  },
  shareMenu: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
    padding: Spacing.sm,
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  shareIcon: {
    marginRight: Spacing.sm,
    width: 24,
  },
  shareOptionText: {
    fontSize: 14,
    color: Colors.textDark,
  },
  
  // ===== MODAL STYLES =====
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  modalBackButton: {
    padding: Spacing.xs,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  modalContent: {
    flex: 1,
  },
  modalArtisanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  modalArtisanImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: Spacing.sm,
  },
  modalArtisanDetails: {
    flex: 1,
  },
  modalArtisanName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.xs,
  },
  modalArtisanCraft: {
    fontSize: 14,
    color: Colors.textMedium,
  },
  modalContentImage: {
    width: '100%',
    height: width,
  },
  modalVideoContainer: {
    position: 'relative',
  },
  modalPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  postDetails: {
    padding: Spacing.md,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  postDate: {
    fontSize: 14,
    color: Colors.textMedium,
    marginBottom: Spacing.md,
  },
  postDescription: {
    fontSize: 16,
    color: Colors.textDark,
    lineHeight: 24,
  },
  // ===== TRACK ORDERS =====
  orderSummary: {
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
estimatedDelivery: {
  fontSize: 16,
  fontWeight: '600',
  color: '#2196F3',
  marginVertical: 16,
  textAlign: 'center',
  padding: 10,
  backgroundColor: '#e3f2fd',
  borderRadius: 5,
  marginHorizontal: 16,
},
trackingContainer: {
  paddingHorizontal: 16,
},
trackingStep: {
  flexDirection: 'row',
  marginBottom: 20,
  alignItems: 'flex-start',
},
trackingStepCompleted: {
  opacity: 1,
},
trackingStepCurrent: {
  // You can add specific styles for the current step if needed
},
trackingIconContainer: {
  alignItems: 'center',
  marginRight: 15,
  width: 30,
},
trackingLine: {
  width: 2,
  height: 40,
  backgroundColor: '#ccc',
  marginVertical: 5,
},
trackingLineCompleted: {
  backgroundColor: '#4CAF50',
},
trackingTextContainer: {
  flex: 1,
},
trackingStepLabel: {
  fontSize: 14,
  color: '#999',
  marginBottom: 4,
},
trackingStepLabelCompleted: {
  color: '#333',
  fontWeight: '500',
},
trackingStepDate: {
  fontSize: 12,
  color: '#666',
},
// ============== RATING SECTION ===================
ratingSection: {
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
ratingTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 16,
  color: '#333',
},
starsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '80%',
  alignSelf: 'center',
},
reviewSection: {
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
reviewTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 12,
  color: '#333',
},
reviewInput: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 12,
  minHeight: 100,
  textAlignVertical: 'top',
},
uploadSection: {
  padding: 16,
},
uploadTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 4,
  color: '#333',
},
uploadSubtitle: {
  fontSize: 14,
  color: '#666',
  marginBottom: 16,
},
uploadButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#a0522d',
  borderStyle: 'dashed',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
},
uploadButtonText: {
  color: 'Colors.primary',
  marginLeft: 8,
  fontWeight: '500',
},
uploadedImagesContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
},
uploadedImageWrapper: {
  width: 80,
  height: 80,
  marginRight: 8,
  marginBottom: 8,
  position: 'relative',
},
uploadedImage: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
},
removeImageButton: {
  position: 'absolute',
  top: -8,
  right: -8,
  backgroundColor: '#F44336',
  borderRadius: 12,
  width: 24,
  height: 24,
  alignItems: 'center',
  justifyContent: 'center',
},
  imageSourceModalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'flex-end',
},
imageSourceModalContent: {
  backgroundColor: 'white',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  paddingHorizontal: 16,
},
imageSourceOption: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
imageSourceOptionText: {
  marginLeft: 16,
  fontSize: 16,
  color: '#333',
},

// ============== RETURNS TRACKING ===================


returnItemSummary: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  marginBottom: 16,
},
trackingTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 12,
  paddingHorizontal: 16,
},

// ================= VIDEO PAGE ===================

videoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  videoHeaderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoContainer: {
    width,
    height: height - (Platform.OS === 'ios' ? 34 : 0),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 34 : 0,
    marginBottom: Platform.OS === 'ios' ? 0 : 60,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 16,
  },
  centerPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActions: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 100,
    marginRight: 8,
  },
  videoActionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  videoActionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  bottomInfo: {
    marginBottom: Platform.OS === 'ios' ? 34 : 60,
    paddingHorizontal: 8,
  },
  videoArtisanInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  videoArtisanImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  videoArtisanName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoCaptionContainer: {
    marginBottom: 8,
  },
  videoCaption: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  videoReadMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  videoViewsText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  // Share modal styles
  videoModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    minHeight: height * 0.3,
  },
  videoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareOptions: {
    marginBottom: 20,
  },
  shareOption: {
    alignItems: 'center',
    marginRight: 20,
  },
  shareIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareOptionText: {
    fontSize: 12,
  },
  nativeShareButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nativeShareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

// ================= PRODUCT REVIEWS ===================
reviewsContainer: {
  marginBottom: 20,
},
ratingSummary: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
  padding: 16,
  backgroundColor: '#f9f9f9',
  borderRadius: 12,
},
averageRatingContainer: {
  alignItems: 'center',
  marginRight: 20,
},
averageRating: {
  fontSize: 36,
  fontWeight: 'bold',
  color: '#333',
},
averageStars: {
  flexDirection: 'row',
  marginVertical: 8,
},
totalReviews: {
  fontSize: 14,
  color: '#666',
},
ratingDistribution: {
  flex: 1,
},
ratingBarContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 6,
},
ratingBarText: {
  width: 50,
  fontSize: 12,
  color: '#666',
},
ratingBar: {
  flex: 1,
  height: 8,
  backgroundColor: '#e0e0e0',
  borderRadius: 4,
  marginHorizontal: 8,
  overflow: 'hidden',
},
ratingBarFill: {
  height: '100%',
  backgroundColor: '#FFD700',
  borderRadius: 4,
},
ratingBarCount: {
  width: 20,
  fontSize: 12,
  color: '#666',
  textAlign: 'right',
},
customerPhotosContainer: {
  marginVertical: 12,
},
customerPhoto: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 8,
},
reviewItem: {
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
},
reviewHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
},
reviewerAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 12,
},
reviewerInfo: {
  flex: 1,
},
reviewerName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 4,
},
reviewRating: {
  flexDirection: 'row',
  alignItems: 'center',
},
reviewDate: {
  fontSize: 12,
  color: '#666',
  marginLeft: 8,
},
reviewComment: {
  fontSize: 14,
  color: '#333',
  lineHeight: 20,
  marginBottom: 12,
},
reviewPhotosContainer: {
  marginTop: 8,
},
reviewPhoto: {
  width: 100,
  height: 100,
  borderRadius: 8,
  marginRight: 8,
},

});

// Export both the styles and the constants for flexibility
export { Colors, Spacing, BorderRadius, Shadows, Typography };
export default AppStyles;