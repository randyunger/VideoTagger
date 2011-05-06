package com.ungersoft.videotagger.util

import javax.ws.rs.core.Response
import javax.ws.rs.core.Response.ResponseBuilder

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 5/6/11
 * Time: 12:14 AM
 * To change this template use File | Settings | File Templates.
 */

object JAXRSUtil{
  def ok(obj:Object):Response = {
    val res = Response.ok(obj).build
    return res
  }
}