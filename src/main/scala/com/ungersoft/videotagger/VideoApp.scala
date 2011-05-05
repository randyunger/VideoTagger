package com.ungersoft.videotagger

import com.sun.jersey.api.core.PackagesResourceConfig
import com.googlecode.objectify.ObjectifyService
import pojos.{Media, HiLitePosition, HiLite, Ad, Product}

/**
* Created by IntelliJ IDEA.
* User: Randy
* Date: 4/25/11
* Time: 9:15 PM
* To change this template use File | Settings | File Templates.
*/

//scanning increases cold start time!
class VideoApp extends PackagesResourceConfig("com.ungersoft.videotagger") {
  ObjectifyService.register(classOf[Ad])
  ObjectifyService.register(classOf[HiLite])
  ObjectifyService.register(classOf[HiLitePosition])
  ObjectifyService.register(classOf[Media])
  ObjectifyService.register(classOf[Product])
//  def this() {
////    this ()
//    this()
//    super.("com.ungersoft.videotagger")
//  }
}