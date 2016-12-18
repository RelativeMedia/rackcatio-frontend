/**
 * Created by mhdevita on 12/14/16.
 */
import { Schema, arrayOf } from 'normalizr'
const itemSchema     = new Schema('item')
const locationSchema = new Schema('location')
const rackSchema     = new Schema('rack')
const subnetSchema   = new Schema('subnet')
const domainSchema   = new Schema('domain')
const userSchema     = new Schema('user')
const commentSchema  = new Schema('comment')

const arrayOfItems     = arrayOf(itemSchema)
const arrayOfLocations = arrayOf(locationSchema)
const arrayOfRacks     = arrayOf(rackSchema)
const arrayOfSubnets   = arrayOf(subnetSchema)
const arrayOfDomains   = arrayOf(domainSchema)
const arrayOfUsers     = arrayOf(userSchema)
const arrayOfComments  = arrayOf(commentSchema)

itemSchema.define({
  rack: rackSchema,
  subnets: arrayOfSubnets,
  domains: arrayOfDomains,
  comments: arrayOfComments,
  createdBy: userSchema,
  updatedBy: userSchema
})
locationSchema.define({
  racks: arrayOfRacks,
  subnets: arrayOfSubnets,
  domains: arrayOfDomains,
  comments: arrayOfComments,
  createdBy: userSchema,
  updatedBy: userSchema
})
rackSchema.define({
  items: arrayOfItems,
  location: locationSchema,
  comments: arrayOfComments,
  createdBy: userSchema,
  updatedBy: userSchema
})
subnetSchema.define({
  items: arrayOfItems,
  location: locationSchema,
  comments: arrayOfComments,
  domains: arrayOfDomains,
  createdBy: userSchema,
  updatedBy: userSchema
})
domainSchema.define({
  items: arrayOfItems,
  location: locationSchema,
  comments: arrayOfComments,
  subnets: arrayOfSubnets,
  createdBy: userSchema,
  updatedBy: userSchema
})
userSchema.define({
  items: arrayOfItems,
  location: locationSchema,
  comments: arrayOfComments,
  subnets: arrayOfSubnets,
  domains: arrayOfDomains,
  racks: arrayOfRacks,
  createdBy: userSchema,
  updatedBy: userSchema
})
commentSchema.define({
  createdBy: userSchema,
  updatedBy: userSchema
})

export default {
  item: itemSchema,
  location: locationSchema,
  rack: rackSchema,
  subnet: subnetSchema,
  domain: domainSchema,
  user: userSchema,
  comment: commentSchema,
  arrayOfItems,
  arrayOfLocations,
  arrayOfRacks,
  arrayOfSubnets,
  arrayOfUsers,
  arrayOfComments
}
