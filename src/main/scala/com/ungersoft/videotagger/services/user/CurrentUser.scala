package com.ungersoft.videotagger.services.user

import com.google.appengine.api.users.{UserService, UserServiceFactory, User}

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 5/6/11
 * Time: 7:31 AM
 * To change this template use File | Settings | File Templates.
 */

object CurrentUser{
  val userService:UserService = UserServiceFactory.getUserService
  def apply():User = userService.getCurrentUser
}