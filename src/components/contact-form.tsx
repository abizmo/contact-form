// 'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card'
import { Checkbox } from '@ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/form'
import { Input } from '@ui/input'
import { RadioGroup, RadioGroupItem } from '@ui/radio-group'
import { toast } from '@ui/use-toast'
import { Textarea } from '@ui/textarea'

const contactFormSchema = z.object({
  first_name: z.string().trim().min(1, {
    message: 'This field is required'
  }),
  last_name: z.string().trim().min(1, {
    message: 'This field is required'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  query_type: z.enum(['general', 'support'], {
    required_error: 'Please select a query type'
  }),
  message: z.string().trim().min(1, {
    message: 'This field is required'
  }),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'To submit this form, please consent to being contacted'
    })
  })
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const defaultValues: Partial<ContactFormValues> = {
  first_name: '',
  last_name: '',
  email: '',
  message: '',
  consent: undefined
}

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  function onSubmit(data: ContactFormValues) {
    console.log(data)
    toast({
      title: (
        <p className='flex gap-2'>
          <img src='/images/icon-success-check.svg' alt='success' />
          Message sent!
        </p>
      ),
      description: "Thanks for completing the form. We'll be in touch soon."
    })
  }

  return (
    <Card className='max-w-3xl mx-auto mt-8'>
      <Form {...form}>
        <CardHeader className='mb-8'>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className='flex flex-wrap gap-x-4'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem className='flex-1 basis-60'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem className='flex-1 basis-60'>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='query_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Query Type</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-wrap gap-4'
                  >
                    <FormItem className='border border-input rounded-lg px-6 py-3 flex items-center gap-4 flex-1 basis-60 mb-0 space-y-0 has-[:checked]:bg-background'>
                      <FormControl>
                        <RadioGroupItem value='general' />
                      </FormControl>
                      <FormLabel className='text-lg'>General Enquiry</FormLabel>
                    </FormItem>
                    <FormItem className='border border-input rounded-lg px-6 py-3 flex items-center gap-4 flex-1 basis-60 mb-0 space-y-0 has-[:checked]:bg-background'>
                      <FormControl>
                        <RadioGroupItem value='support' />
                      </FormControl>
                      <FormLabel className='text-lg'>Support Request</FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='mb-10'>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='consent'
              render={({ field }) => (
                <FormItem className='mb-10'>
                  <div className='flex flex-row items-center space-x-3'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel className='normal-case'>
                        I consent to being contacted by the team
                      </FormLabel>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
