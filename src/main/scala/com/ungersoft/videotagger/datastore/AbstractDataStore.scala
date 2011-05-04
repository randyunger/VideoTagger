package com.ungersoft.videotagger.datastore

import com.ungersoft.videotagger.pojos.Ad

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 7:11 AM
 * To change this template use File | Settings | File Templates.
 */

trait AbstractDataStore{
  def store(ad:Ad)
  def retrieve(id:Long):Ad
}