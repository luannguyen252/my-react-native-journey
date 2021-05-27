/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule Fonts
 */

import { isIOS, isAndroid } from 'Platforms';

export default {
  serif: isIOS ? 'Georgia' : 'serif',
  sans:  isIOS ? 'Helvetica Neue' : 'sans',
}
