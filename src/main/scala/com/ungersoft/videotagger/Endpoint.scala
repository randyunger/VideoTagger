package com.ungersoft.videotagger

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/25/11
 * Time: 9:08 PM
 * To change this template use File | Settings | File Templates.
 */

import javax.ws.rs.GET
import javax.ws.rs.Produces
import javax.ws.rs.Path


class Endpoint {
  @GET
  @Path("/helloworld")
  @Produces(Array("text/plain"))
  def getMessage: String = {
    return "Hello World scala"
  }
}