<?php

/* @Framework/FormTable/form_widget_compound.html.php */
class __TwigTemplate_e67b0b25e7d0598d8243f24dfb359bbcbd58c93881993a573c3f6a84821b595a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_0242c237718f5a09995c8f064ae0729ac4e1ee531220990eab552eafb4637546 = $this->env->getExtension("native_profiler");
        $__internal_0242c237718f5a09995c8f064ae0729ac4e1ee531220990eab552eafb4637546->enter($__internal_0242c237718f5a09995c8f064ae0729ac4e1ee531220990eab552eafb4637546_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/FormTable/form_widget_compound.html.php"));

        // line 1
        echo "<table <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
    <?php if (!\$form->parent && \$errors): ?>
    <tr>
        <td colspan=\"2\">
            <?php echo \$view['form']->errors(\$form) ?>
        </td>
    </tr>
    <?php endif ?>
    <?php echo \$view['form']->block(\$form, 'form_rows') ?>
    <?php echo \$view['form']->rest(\$form) ?>
</table>
";
        
        $__internal_0242c237718f5a09995c8f064ae0729ac4e1ee531220990eab552eafb4637546->leave($__internal_0242c237718f5a09995c8f064ae0729ac4e1ee531220990eab552eafb4637546_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/FormTable/form_widget_compound.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <table <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/*     <?php if (!$form->parent && $errors): ?>*/
/*     <tr>*/
/*         <td colspan="2">*/
/*             <?php echo $view['form']->errors($form) ?>*/
/*         </td>*/
/*     </tr>*/
/*     <?php endif ?>*/
/*     <?php echo $view['form']->block($form, 'form_rows') ?>*/
/*     <?php echo $view['form']->rest($form) ?>*/
/* </table>*/
/* */
