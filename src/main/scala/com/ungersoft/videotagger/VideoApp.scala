package com.ungersoft.videotagger

import com.sun.jersey.api.core.PackagesResourceConfig
import pojos.Ad
import com.googlecode.objectify.ObjectifyService

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
//  def this() {
////    this ()
//    this()
//    super.("com.ungersoft.videotagger")
//  }
}