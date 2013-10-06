package com.homely;

import android.test.ActivityInstrumentationTestCase2;

/**
 * This is a simple framework for a test of an Application.  See
 * {@link android.test.ApplicationTestCase ApplicationTestCase} for more information on
 * how to write and extend Application tests.
 * <p/>
 * To run this test, you can type:
 * adb shell am instrument -w \
 * -e class com.homely.HomelyActivityTest \
 * com.homely.tests/android.test.InstrumentationTestRunner
 */
public class HomelyActivityTest extends ActivityInstrumentationTestCase2<HomelyActivity> {

	public HomelyActivityTest() {
		super("com.homely", HomelyActivity.class);
	}

}
